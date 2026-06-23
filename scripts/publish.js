// scripts/publish.js
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

const workspaceDirs = [
  'components',
  ...fs.readdirSync(path.join(rootDir, 'packages')).map((p) => `packages/${p}`),
];

console.log('🔍 Collecting packages that need publishing...\n');

const toPublish = [];

for (const ws of workspaceDirs) {
  const pkgPath = path.join(rootDir, ws, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;

  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch (e) {
    console.warn(`⚠️  Could not read ${ws}/package.json`);
    continue;
  }

  if (pkg.private) {
    console.log(`⏭️  Skipping private package: ${pkg.name}`);
    continue;
  }

  const version = pkg.version;

  try {
    execSync(`npm view ${pkg.name}@${version} version --json`, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    console.log(`✅ ${pkg.name}@${version} already exists`);
  } catch (error) {
    const stderr =
      typeof error?.stderr === 'string' ? error.stderr : error?.stderr?.toString?.('utf8');
    if (error.status === 1 && stderr?.includes('E404')) {
      toPublish.push({ name: pkg.name, dir: ws, version, pkg });
      console.log(`📋 Will publish: ${pkg.name}@${version}`);
    } else {
      console.error(`❌ Could not check ${pkg.name}@${version}${stderr ? `\n${stderr}` : ''}`);
      throw error;
    }
  }
}

if (toPublish.length === 0) {
  console.log('🎉 Nothing to publish.');
  process.exit(0);
}

// Topological sort (dependencies first)
function getTopoOrder(packages) {
  const order = [];
  const visited = new Set();
  const visiting = new Set();

  function visit(item) {
    if (visiting.has(item.name)) throw new Error(`Circular dependency: ${item.name}`);
    if (visited.has(item.name)) return;

    visiting.add(item.name);

    const deps = { ...(item.pkg.dependencies || {}), ...(item.pkg.peerDependencies || {}) };
    for (const [depName, range] of Object.entries(deps)) {
      if (range.startsWith('workspace:')) {
        const dep = packages.find((p) => p.name === depName);
        if (dep) visit(dep);
      }
    }

    visiting.delete(item.name);
    visited.add(item.name);
    order.push(item);
  }

  packages.forEach((p) => {
    visit(p);
  });

  return order;
}

const publishOrder = getTopoOrder(toPublish);

console.log(`\n🚀 Publishing ${publishOrder.length} package(s) in order...\n`);

const tarballs = [];

try {
  for (const item of publishOrder) {
    const wsPath = path.join(rootDir, item.dir);
    console.log(`📦 Packing ${item.name}@${item.version}...`);

    // Use bun pm pack --quiet to get only the filename
    const tarballName = execSync('bun pm pack --quiet', {
      cwd: wsPath,
      encoding: 'utf8',
    }).trim();

    const tarballPath = path.join(wsPath, tarballName);
    tarballs.push(tarballPath);

    console.log(`🚀 Publishing ${path.basename(tarballPath)} ...`);
    execSync(`npm publish "${tarballPath}" --provenance --access public`, {
      stdio: 'inherit',
    });

    console.log(`✅ Published ${item.name}@${item.version}\n`);
  }

  console.log('🎉 All packages published successfully!');
} catch (error) {
  console.error('\n❌ Publish failed mid-way:', error.message);
  console.error('⚠️  Some packages were published. You may need to manually fix versions.');
  process.exit(1);
} finally {
  // Cleanup tarballs
  tarballs.forEach((t) => {
    try {
      if (fs.existsSync(t)) {
        fs.unlinkSync(t);
        console.log(`🧹 Cleaned up ${path.basename(t)}`);
      }
    } catch (e) {
      console.warn(`⚠️  Failed to clean up ${path.basename(t)}`);
    }
  });
}
