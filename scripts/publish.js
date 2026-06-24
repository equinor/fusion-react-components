// scripts/publish.js
//
// Publishes every workspace package that is not yet on npm. Run after
// `changeset version` has bumped versions and `bun run build` has produced the
// `dist` output. High-level flow:
//   1. Read all workspace package.json files and record their versions.
//   2. Collect the public packages whose current version is missing from npm.
//   3. Publish them dependencies-first so a dependent never lands before the
//      package it depends on.
//   4. For each package, resolve `workspace:*` ranges to concrete versions,
//      pack with bun, publish the tarball with npm, then clean up.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

// All published workspace package directories, from the `workspaces` globs in the
// root package.json (the single `components` package plus everything in packages/).
const workspaceDirs = [
  'components',
  ...fs
    .readdirSync(path.join(rootDir, 'packages'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((p) => `packages/${p.name}`),
];

// Map of every workspace package name -> its current on-disk version.
// Used to resolve `workspace:*` ranges at pack time, because `bun pm pack`
// substitutes them from `bun.lock`, which Bun does not refresh after a version
// bump (oven-sh/bun#18906, #20477). Resolving from disk avoids that bug without
// regenerating or deleting the lockfile.
const workspaceVersions = Object.create(null);
for (const ws of workspaceDirs) {
  const pkgPath = path.join(rootDir, ws, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  try {
    const p = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (p.name && p.version) workspaceVersions[p.name] = p.version;
  } catch (e) {
    console.warn(`⚠️  Could not read ${ws}/package.json for workspace version resolution`);
  }
}

/** Resolve a single `workspace:` range to a concrete npm range using on-disk versions. */
function resolveWorkspaceRange(range, depName) {
  const spec = range.slice('workspace:'.length);
  const version = workspaceVersions[depName];
  if (!version) {
    throw new Error(
      `Cannot resolve workspace dependency '${depName}': not found among workspace packages`,
    );
  }
  if (spec === '' || spec === '*') return version;
  if (spec === '^') return `^${version}`;
  if (spec === '~') return `~${version}`;
  // Explicit range such as `workspace:^1.2.3` or `workspace:1.2.3`: drop the prefix.
  return spec;
}

/** Return a copy of `pkg` with all `workspace:` ranges resolved, plus whether anything changed. */
function resolveWorkspaceDeps(pkg) {
  const fields = ['dependencies', 'peerDependencies', 'optionalDependencies'];
  const resolved = { ...pkg };
  let changed = false;
  for (const field of fields) {
    if (!pkg[field]) continue;
    const out = { ...pkg[field] };
    for (const [name, range] of Object.entries(out)) {
      if (typeof range === 'string' && range.startsWith('workspace:')) {
        out[name] = resolveWorkspaceRange(range, name);
        changed = true;
      }
    }
    resolved[field] = out;
  }
  return { resolved, changed };
}

console.log('🔍 Collecting packages that need publishing...\n');

// Packages whose current version is not yet on npm and therefore need publishing.
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

  // Private packages (e.g. internal-only or the storybook app) are never published.
  if (pkg.private) {
    console.log(`⏭️  Skipping private package: ${pkg.name}`);
    continue;
  }

  const version = pkg.version;

  // `npm view <name>@<version>` exits 0 if the version already exists on the
  // registry. A non-zero exit with an E404 in stderr means that exact version
  // has never been published, so it is a publish candidate. Any other failure
  // (network, auth, etc.) is unexpected and aborts the run.
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
//
// npm publishes are not transactional, so a package must be live on the registry
// before anything that depends on it is published. We walk each package's
// workspace dependencies first (depth-first) and emit it only after its deps,
// producing an order where every dependency precedes its dependents. The
// `visiting` set detects cycles, which would otherwise recurse forever.
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

    // Resolve `workspace:*` ranges to concrete versions before packing so the
    // published tarball pins the correct sibling versions, independent of
    // `bun.lock` (see oven-sh/bun#18906). The original package.json is restored
    // immediately after packing so the working tree keeps its `workspace:*` ranges.
    const pkgJsonPath = path.join(wsPath, 'package.json');
    const originalPkgJson = fs.readFileSync(pkgJsonPath, 'utf8');
    const { resolved, changed } = resolveWorkspaceDeps(item.pkg);

    let tarballName;
    try {
      if (changed) {
        fs.writeFileSync(pkgJsonPath, `${JSON.stringify(resolved, null, 2)}\n`);
      }
      // Use bun pm pack --quiet to get only the filename
      tarballName = execSync('bun pm pack --quiet', {
        cwd: wsPath,
        encoding: 'utf8',
      }).trim();
    } finally {
      if (changed) fs.writeFileSync(pkgJsonPath, originalPkgJson);
    }

    const tarballPath = path.join(wsPath, tarballName);
    tarballs.push(tarballPath);

    // Publish the already-built tarball (not the working directory). --provenance
    // attaches a signed build attestation; --access public is required for the
    // first publish of a scoped package.
    console.log(`🚀 Publishing ${path.basename(tarballPath)} ...`);
    execSync(`npm publish "${tarballPath}" --provenance --access public`, {
      stdio: 'inherit',
    });

    console.log(`✅ Published ${item.name}@${item.version}\n`);
  }

  console.log('🎉 All packages published successfully!');
} catch (error) {
  // Because publishing is sequential and non-transactional, a mid-run failure
  // can leave some packages published and others not. Surface that clearly and
  // fail the job so the release can be inspected/retried.
  console.error('\n❌ Publish failed mid-way:', error.message);
  console.error('⚠️  Some packages were published. You may need to manually fix versions.');
  process.exit(1);
} finally {
  // Always remove the generated *.tgz tarballs, whether the run succeeded or
  // failed, so they are never left behind in the workspace.
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
