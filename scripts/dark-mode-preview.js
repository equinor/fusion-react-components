import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const registry = 'http://127.0.0.1:4873';
const tag = 'dark-mode';
const config = join(homedir(), '.config/fusion-dark-mode');
const npmrc = join(config, 'npmrc');
const repository = 'equinor/fusion-react-components';
const dependencyFields = ['dependencies', 'optionalDependencies', 'peerDependencies'];
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const writeJson = (file, value) => writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
const sri = /^sha512-[A-Za-z0-9+/]{86}==$/;

function run(command, args, cwd, capture = false) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const code = /\bnpm error code (\w+)\b/.exec(result.stderr ?? '')?.[1];
    throw new Error(`${command} ${args[0]} failed (${code ?? result.status ?? result.signal})`, {
      cause: code,
    });
  }
  return capture ? result.stdout.trim() : undefined;
}

function npm(temp, ...args) {
  return run(
    'npm',
    [
      ...args,
      `--registry=${registry}`,
      `--userconfig=${npmrc}`,
      '--globalconfig=/dev/null',
      '--noproxy=127.0.0.1',
      '--prefer-online',
      '--fetch-retries=0',
    ],
    temp,
    true,
  );
}

function dist(temp, spec, allowMissing = false) {
  try {
    return JSON.parse(npm(temp, 'view', spec, 'dist', '--json'));
  } catch (error) {
    if (allowMissing && error.cause === 'E404') return undefined;
    throw error;
  }
}

function verifyDist(temp, spec, integrity) {
  const artifact = dist(temp, spec);
  if (new URL(artifact.tarball).origin !== registry || artifact.integrity !== integrity) {
    throw new Error(`${spec} does not match the loopback preview artifact`);
  }
}

function verifyTag(temp, name, version) {
  const tags = JSON.parse(npm(temp, 'view', name, 'dist-tags', '--json'));
  if (tags[tag] !== version || tags.latest === version) {
    throw new Error(`${name}@${version} must be tagged ${tag}, not latest`);
  }
}

function verifyLock(root, cwd, artifacts) {
  const { packages } = Bun.JSONC.parse(readFileSync(join(cwd, 'bun.lock'), 'utf8'));
  const used = new Set();
  for (const [resolution, tarball, , integrity] of Object.values(packages)) {
    const name = resolution.slice(0, resolution.lastIndexOf('@'));
    const artifact = artifacts[name];
    if (!artifact) continue;
    const spec = `${name}@${artifact.version}`;
    if (
      spec !== resolution ||
      integrity !== artifact.integrity ||
      !tarball.startsWith(`${registry}/`)
    ) {
      throw new Error(`Bun selected ${resolution} instead of the verified ${spec}`);
    }
    if (!used.has(name)) {
      verifyDist(root, spec, integrity);
      verifyTag(root, name, artifact.version);
    }
    used.add(name);
  }
  return used;
}

function workspaces(cwd) {
  const dirs = [
    'components',
    'storybook',
    ...readdirSync(join(cwd, 'packages')).map((p) => `packages/${p}`),
  ];
  return new Map(
    dirs.flatMap((dir) => {
      const file = join(cwd, dir, 'package.json');
      if (!existsSync(file)) return [];
      return [[readJson(file).name, file]];
    }),
  );
}

function packReleases(temp, artifacts, workspaces, releases) {
  const packed = new Map();
  function pack(name, dependency = false) {
    if (packed.has(name)) return;
    const file = workspaces.get(name);
    const pkg = readJson(file);
    if (pkg.private) throw new Error(`Cannot publish private workspace ${name}`);
    const spec = `${name}@${pkg.version}`;
    if (dependency && !releases.has(name) && dist(temp, spec, true)) return;
    packed.set(name, null);
    for (const field of [...dependencyFields, 'devDependencies']) {
      for (const [dep, range] of Object.entries(pkg[field] ?? {})) {
        const sibling = workspaces.get(dep);
        if (range.startsWith('workspace:') && sibling) {
          if (field !== 'devDependencies') pack(dep, true);
          pkg[field][dep] = readJson(sibling).version;
        } else if (artifacts[dep]) {
          const version = artifacts[dep].version;
          if (!Bun.semver.satisfies(version, range)) {
            throw new Error(`${dep}@${version} does not satisfy ${name}'s ${range}`);
          }
          pkg[field][dep] = version;
        } else if (/^(workspace:|file:|link:|portal:|\.{1,2}\/|\/)/.test(range)) {
          throw new Error(`${spec} has a nonportable dependency on ${dep}`);
        }
      }
    }
    delete pkg.publishConfig;
    writeJson(file, pkg);
    const [tarball] = JSON.parse(
      npm(temp, 'pack', '--ignore-scripts', '--json', `--pack-destination=${temp}`, dirname(file)),
    );
    if (tarball.id !== spec || !tarball.files.some(({ path }) => path.startsWith('dist/'))) {
      throw new Error(`Incomplete tarball for ${spec}`);
    }
    packed.delete(name);
    packed.set(name, tarball);
  }
  for (const name of releases) pack(name);
  return packed;
}

const [action, ...extra] = process.argv.slice(2);
if (!['check', 'publish'].includes(action) || extra.length) {
  throw new Error('Usage: bun scripts/dark-mode-preview.js check|publish');
}
if (!existsSync(npmrc)) throw new Error(`Set up the private Verdaccio npmrc at ${npmrc} first`);
const webManifest = join(config, 'web.json');
if (!existsSync(webManifest))
  throw new Error(`Publish the web preview and create ${webManifest} first`);
const { repository: webRepository, commit: webCommit, packages: upstream } = readJson(webManifest);
if (
  webRepository !== 'equinor/fusion-web-components' ||
  !/^[0-9a-f]{40}$/.test(webCommit) ||
  !upstream?.['@equinor/fusion-wc-theme'] ||
  !Object.entries(upstream).every(
    ([name, artifact]) =>
      /^@equinor\/fusion-(wc-[a-z0-9-]+|web-components)$/.test(name) &&
      /^\d+\.\d+\.\d+$/.test(artifact?.version) &&
      sri.test(artifact?.integrity),
  )
) {
  throw new Error('Invalid web-components preview manifest');
}

const temp = mkdtempSync(join(realpathSync(tmpdir()), 'fusion-react-preview-'));
const cwd = join(temp, 'worktree');
const installArgs = ['install', `--registry=${registry}`, `--cache-dir=${join(temp, 'cache')}`];
try {
  const scope = npm(temp, 'config', 'get', '@equinor:registry');
  if (scope !== 'undefined' && scope !== registry && scope !== `${registry}/`) {
    throw new Error('The preview npmrc must not direct @equinor to another registry');
  }
  npm(temp, 'ping');
  if (action === 'publish') npm(temp, 'whoami');
  const commit = run('git', ['rev-parse', 'HEAD'], process.cwd(), true);
  run('git', ['worktree', 'add', '--detach', cwd, commit]);

  const workspaceFiles = workspaces(cwd);
  for (const file of workspaceFiles.values()) {
    const pkg = readJson(file);
    for (const field of [...dependencyFields, 'devDependencies']) {
      for (const [name, range] of Object.entries(pkg[field] ?? {})) {
        if (upstream[name] && !Bun.semver.satisfies(upstream[name].version, range)) {
          throw new Error(
            `${name}@${upstream[name].version} does not satisfy ${pkg.name}'s ${range}`,
          );
        }
      }
    }
  }
  const rootFile = join(cwd, 'package.json');
  const pkg = readJson(rootFile);
  pkg.overrides ??= {};
  for (const [name, { version }] of Object.entries(upstream)) pkg.overrides[name] = version;
  writeJson(rootFile, pkg);
  const projectNpmrc = join(cwd, '.npmrc');
  symlinkSync(npmrc, projectNpmrc);
  run('bun', installArgs, cwd);
  unlinkSync(projectNpmrc);
  const used = verifyLock(temp, cwd, upstream);
  if (!used.has('@equinor/fusion-wc-theme'))
    throw new Error('Bun did not install the preview theme');

  const planFile = join(temp, 'releases.json');
  run('bun', ['run', 'changeset', 'status', `--output=${planFile}`], cwd);
  const releases = new Set(
    readJson(planFile)
      .releases.filter(
        ({ type, name }) => type !== 'none' && !readJson(workspaceFiles.get(name)).private,
      )
      .map(({ name }) => name),
  );
  if (releases.size === 0) throw new Error('No public React releases in the Changesets plan');
  run('bun', ['run', 'changeset', 'version'], cwd);
  run('bun', ['run', 'check'], cwd);
  run('bun', ['run', 'build'], cwd);
  run('bun', ['run', 'test'], cwd);

  const packed = packReleases(temp, upstream, workspaceFiles, releases);
  const existing = new Set();
  if (action === 'publish') {
    for (const artifact of packed.values()) {
      if (!dist(temp, artifact.id, true)) continue;
      verifyDist(temp, artifact.id, artifact.integrity);
      verifyTag(temp, artifact.name, artifact.version);
      existing.add(artifact.name);
    }
  }
  const packages = {};
  for (const artifact of packed.values()) {
    if (action === 'publish' && !existing.has(artifact.name)) {
      npm(
        temp,
        'publish',
        join(temp, artifact.filename),
        `--tag=${tag}`,
        '--access=public',
        '--provenance=false',
        '--ignore-scripts',
      );
      verifyDist(temp, artifact.id, artifact.integrity);
      verifyTag(temp, artifact.name, artifact.version);
    }
    packages[artifact.name] = { version: artifact.version, integrity: artifact.integrity };
    console.log(`${action === 'check' ? 'Packed' : 'Verified'} ${artifact.id}`);
  }
  if (action === 'publish') {
    writeJson(join(config, 'react.json'), { repository, commit, packages });
  }
} finally {
  if (existsSync(cwd)) run('git', ['worktree', 'remove', '--force', cwd]);
  rmSync(temp, { recursive: true });
}
