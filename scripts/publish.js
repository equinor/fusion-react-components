// scripts/publish.js
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

// Adjust these to match your workspace setup
const workspaceDirs = ['components', ...fs.readdirSync('packages').map((p) => `packages/${p}`)];

console.log('🔍 Checking packages for publishing...\n');

for (const ws of workspaceDirs) {
  const pkgPath = path.join(rootDir, ws, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;

  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch (_e) {
    console.warn(`⚠️  Could not read package.json in ${ws}`);
    continue;
  }

  if (pkg.private) {
    console.log(`⏭️  Skipping private package: ${pkg.name}`);
    continue;
  }

  const packageName = pkg.name;
  const version = pkg.version;

  console.log(`📋 Checking ${packageName}@${version}...`);

  let alreadyPublished = false;

  try {
    // Check if this exact version exists on npm
    const output = execSync(`npm view ${packageName}@${version} version --json`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const publishedVersion = JSON.parse(output.trim());
    if (publishedVersion === version) {
      alreadyPublished = true;
    }
  } catch (error) {
    // Version does not exist → we should publish
    const stderr =
      typeof error?.stderr === 'string' ? error.stderr : error?.stderr?.toString?.('utf8');
    if (error.status === 1 && stderr?.includes('E404')) {
      alreadyPublished = false;
    } else {
      console.warn(`⚠️  Could not check registry for ${packageName}: ${error.message}`);
    }
  }

  if (alreadyPublished) {
    console.log(`✅ ${packageName}@${version} already published — skipping\n`);
    continue;
  }

  console.log(`📦 Packing ${packageName}@${version} with bun...`);
  let tarballPath;
  try {
    // Run bun pack and capture the output filename
    const packOutput = execSync('bun pm pack --quiet', {
      cwd: path.join(rootDir, ws),
      encoding: 'utf8',
    });

    const packInfo = packOutput.trim();
    tarballPath = path.join(rootDir, ws, packInfo);
  } catch (error) {
    console.error(`❌ bun pm pack failed for ${packageName}`, error.message);
    process.exit(1);
  }

  console.log(`🚀 Publishing tarball: ${path.basename(tarballPath)}`);
  try {
    execSync(`npm publish "${tarballPath}" --provenance --access public`, {
      stdio: 'inherit',
    });
    console.log(`✅ Successfully published ${packageName}@${version}\n`);
  } catch (error) {
    console.error(`❌ Publish failed for ${packageName}`, error.message);
    process.exit(1);
  }
}

console.log('🎉 Publish process completed!');
