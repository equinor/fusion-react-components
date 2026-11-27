import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
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
const config = join(homedir(), '.config/fusion-dark-mode');
const npmrc = join(config, 'npmrc');
const repository = 'equinor/fusion-react-components';
const dependencyFields = ['dependencies', 'optionalDependencies', 'peerDependencies'];
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const writeJson = (file, value) => writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
const sri = /^sha512-[A-Za-z0-9+/]{86}==$/;
const fullSha = /^[a-f0-9]{40}$/;
const stableVersion = /^\d+\.\d+\.\d+$/;

function isSnapshot(artifact, suffix) {
  return (
    stableVersion.test(artifact?.stableVersion) &&
    artifact.version === `${artifact.stableVersion}-${suffix}` &&
    sri.test(artifact.integrity)
  );
}

function satisfies(artifact, range) {
  return range === artifact.version || Bun.semver.satisfies(artifact.stableVersion, range);
}

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

function readTags(temp, name) {
  try {
    return JSON.parse(npm(temp, 'view', name, 'dist-tags', '--json'));
  } catch (error) {
    if (error.cause === 'E404') return {};
    throw error;
  }
}

function verifyArtifact(temp, name, artifact, tag) {
  const { version, integrity } = artifact;
  verifyDist(temp, `${name}@${version}`, integrity);
  const tags = readTags(temp, name);
  if (tags[tag] !== version || tags.latest === version || tags['dark-mode'] === version) {
    throw new Error(`${name}@${version} must have ${tag} without a moving tag`);
  }
}

function verifyLock(root, cwd, artifacts, tag, checkRanges = true) {
  const { packages } = Bun.JSONC.parse(readFileSync(join(cwd, 'bun.lock'), 'utf8'));
  const used = new Set();
  for (const [key, [resolution, tarball, metadata, integrity]] of Object.entries(packages)) {
    for (const field of dependencyFields) {
      for (const [name, range] of Object.entries(metadata?.[field] ?? {})) {
        const candidate = artifacts[name];
        if (checkRanges && candidate && !satisfies(candidate, range)) {
          throw new Error(
            `${resolution} requires ${name}@${range}, incompatible with ${candidate.version}`,
          );
        }
      }
    }
    const at = resolution.lastIndexOf('@');
    const name = resolution.slice(0, at);
    const artifact = artifacts[name];
    if (!artifact) continue;
    const spec = `${name}@${artifact.version}`;
    if (
      !checkRanges &&
      key !== name &&
      name === '@equinor/fusion-web-theme' &&
      Bun.semver.satisfies(resolution.slice(at + 1), '^0.1.12')
    ) {
      continue;
    }
    if (
      spec !== resolution ||
      integrity !== artifact.integrity ||
      !tarball?.startsWith(`${registry}/`)
    ) {
      throw new Error(`Bun selected ${resolution} instead of the verified ${spec}`);
    }
    if (!used.has(name)) verifyArtifact(root, name, artifact, tag);
    used.add(name);
  }
  return used;
}

function verifyConsumer(temp, packages) {
  const consumer = join(temp, 'consumer');
  mkdirSync(consumer);
  writeJson(join(consumer, 'package.json'), {
    private: true,
    dependencies: Object.fromEntries(
      Object.entries(packages).map(([name, artifact]) => [name, artifact.version]),
    ),
  });
  install(temp, consumer, 'consumer-cache');
  // Older Web packages keep their own compatible theme; the consumer has no overrides.
  const react = verifyLock(temp, consumer, packages, tag, false);
  const web = verifyLock(temp, consumer, upstream, webTag);
  if (react.size !== Object.keys(packages).length || !web.has('@equinor/fusion-wc-theme')) {
    throw new Error('Clean consumer install is missing expected React or Web packages');
  }
  console.log(
    `Verified ${react.size} React snapshots and ${web.size} Web snapshots in a clean consumer`,
  );
}

function install(temp, cwd, cache = 'cache') {
  const projectNpmrc = join(cwd, '.npmrc');
  symlinkSync(npmrc, projectNpmrc);
  try {
    run('bun', ['install', `--registry=${registry}`, `--cache-dir=${join(temp, cache)}`], cwd);
  } finally {
    unlinkSync(projectNpmrc);
  }
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
    if (dependency && !releases.has(name)) {
      if (dist(temp, spec, true)) return;
      throw new Error(`${spec} is not available and has no planned snapshot release`);
    }
    packed.set(name, null);
    for (const field of [...dependencyFields, 'devDependencies']) {
      for (const [dep, range] of Object.entries(pkg[field] ?? {})) {
        const sibling = workspaces.get(dep);
        if (range.startsWith('workspace:') && sibling) {
          if (field !== 'devDependencies') pack(dep, true);
          pkg[field][dep] = readJson(sibling).version;
        } else if (artifacts[dep]) {
          const version = artifacts[dep].version;
          if (!satisfies(artifacts[dep], range)) {
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
  for (const name of releases.keys()) pack(name);
  return packed;
}

const [action, webSha, source, ...extra] = process.argv.slice(2);
if (
  !['check', 'publish'].includes(action) ||
  !/^[a-f0-9]{8}$/.test(webSha) ||
  (source !== undefined && !fullSha.test(source)) ||
  extra.length
) {
  throw new Error(
    'Usage: bun scripts/dark-mode-preview.js check|publish <web-short-sha> [react-full-sha]',
  );
}
if (!existsSync(npmrc)) throw new Error(`Set up the private Verdaccio npmrc at ${npmrc} first`);
const webFilename = `web-${webSha}.json`;
const webManifest = join(config, webFilename);
if (!existsSync(webManifest))
  throw new Error(`Publish the web preview and create ${webManifest} first`);
const { repository: webRepository, commit: webCommit, tag: webTag, packages: upstream } =
  readJson(webManifest);
if (
  webRepository !== 'equinor/fusion-web-components' ||
  !fullSha.test(webCommit) ||
  !webCommit.startsWith(webSha) ||
  webTag !== `dark-mode-${webSha}` ||
  !upstream?.['@equinor/fusion-wc-theme'] ||
  !Object.entries(upstream).every(
    ([name, artifact]) =>
      /^@equinor\/fusion-(wc-[a-z0-9-]+|web-components)$/.test(name) &&
      isSnapshot(artifact, webTag),
  )
) {
  throw new Error('Invalid web-components preview manifest');
}

const commit = run(
  'git',
  ['rev-parse', '--verify', `${source ?? 'HEAD'}^{commit}`],
  process.cwd(),
  true,
);
const short = commit.slice(0, 8);
const tag = `dark-mode-${short}-${webSha}`;
const suffix = `dark-mode.g${short}.g${webSha}`;
const manifest = join(config, `react-${short}-${webSha}.json`);
const upstreamSource = {
  repository: webRepository,
  commit: webCommit,
  tag: webTag,
  manifest: webFilename,
};

function reuseSnapshot(temp) {
  const previous = readJson(manifest);
  if (
    previous.repository !== repository ||
    previous.commit !== commit ||
    previous.tag !== tag ||
    Object.entries(upstreamSource).some(([key, value]) => previous.upstream?.[key] !== value) ||
    !sri.test(previous.upstream?.lockIntegrity) ||
    !previous.packages?.['@equinor/fusion-react-styles'] ||
    !Object.entries(previous.packages).every(
      ([name, artifact]) =>
        /^@equinor\/fusion-(react-[a-z0-9-]+|web-theme)$/.test(name) &&
        isSnapshot(artifact, suffix),
    )
  ) {
    throw new Error(`Cannot reuse invalid React snapshot manifest: ${manifest}`);
  }
  verifyConsumer(temp, previous.packages);
  console.log(`Reused ${manifest}`);
}

const temp = mkdtempSync(join(realpathSync(tmpdir()), 'fusion-react-preview-'));
const cwd = join(temp, 'worktree');
function buildSnapshot() {
  run('git', ['worktree', 'add', '--detach', cwd, commit]);

  const workspaceFiles = workspaces(cwd);
  const direct = new Set();
  for (const file of workspaceFiles.values()) {
    const pkg = readJson(file);
    for (const field of [...dependencyFields, 'devDependencies']) {
      for (const [name, range] of Object.entries(pkg[field] ?? {})) {
        if (!upstream[name]) continue;
        direct.add(name);
        if (!satisfies(upstream[name], range)) {
          throw new Error(
            `${name}@${upstream[name].stableVersion} does not satisfy ${pkg.name}'s ${range}`,
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
  install(temp, cwd);
  const used = verifyLock(temp, cwd, upstream, webTag);
  for (const name of direct) {
    if (!used.has(name)) throw new Error(`Bun did not install preview ${name}`);
  }
  const lockHash = createHash('sha512').update(readFileSync(join(cwd, 'bun.lock'))).digest('base64');

  const planFile = join(temp, 'releases.json');
  run('bun', ['run', 'changeset', 'status', `--output=${planFile}`], cwd);
  const releases = new Map(
    readJson(planFile)
      .releases.filter(
        ({ type, name }) => type !== 'none' && !readJson(workspaceFiles.get(name)).private,
      )
      .map(({ name, newVersion }) => [name, newVersion]),
  );
  if (releases.size === 0) throw new Error('No public React releases in the Changesets plan');
  const changesetsFile = join(cwd, '.changeset/config.json');
  const changesets = readJson(changesetsFile);
  changesets.snapshot = { ...changesets.snapshot, useCalculatedVersion: true };
  writeJson(changesetsFile, changesets);
  run(
    'bun',
    ['run', 'changeset', 'version', '--snapshot', suffix, '--snapshot-prerelease-template', '{tag}'],
    cwd,
  );
  for (const [name, version] of releases) {
    if (readJson(workspaceFiles.get(name)).version !== `${version}-${suffix}`) {
      throw new Error(`Unexpected Changesets snapshot version for ${name}`);
    }
  }
  run('bun', ['run', 'check'], cwd);
  run('bun', ['run', 'build'], cwd);
  run('bun', ['run', 'test'], cwd);

  const packed = packReleases(temp, upstream, workspaceFiles, releases);
  const existing = new Set();
  const previousTags = new Map();
  if (action === 'publish') {
    for (const artifact of packed.values()) {
      const tags = readTags(temp, artifact.name);
      if (tags[tag] && tags[tag] !== artifact.version) {
        throw new Error(`Refusing to move ${artifact.name}'s existing ${tag} tag`);
      }
      previousTags.set(artifact.name, tags);
      if (!dist(temp, artifact.id, true)) continue;
      verifyArtifact(temp, artifact.name, artifact, tag);
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
      verifyArtifact(temp, artifact.name, artifact, tag);
    }
    if (action === 'publish') {
      const current = readTags(temp, artifact.name);
      const previous = previousTags.get(artifact.name);
      if (current.latest !== previous.latest || current['dark-mode'] !== previous['dark-mode']) {
        throw new Error(`Existing tags changed for ${artifact.name}`);
      }
    }
    packages[artifact.name] = {
      version: artifact.version,
      stableVersion: releases.get(artifact.name),
      integrity: artifact.integrity,
    };
    console.log(`${action === 'check' ? 'Packed' : 'Verified'} ${artifact.id}`);
  }
  if (action === 'publish') {
    verifyConsumer(temp, packages);
    const upstreamDetails = { ...upstreamSource, lockIntegrity: `sha512-${lockHash}` };
    writeFileSync(
      manifest,
      `${JSON.stringify({ repository, commit, tag, upstream: upstreamDetails, packages }, null, 2)}\n`,
      { flag: 'wx', mode: 0o600 },
    );
    console.log(`Wrote ${manifest}`);
  }
}

try {
  const scope = npm(temp, 'config', 'get', '@equinor:registry');
  if (scope !== 'undefined' && scope !== registry && scope !== `${registry}/`) {
    throw new Error('The preview npmrc must not direct @equinor to another registry');
  }
  npm(temp, 'ping');
  if (action === 'publish' && existsSync(manifest)) {
    reuseSnapshot(temp);
  } else {
    if (action === 'publish') npm(temp, 'whoami');
    buildSnapshot();
  }
} finally {
  if (existsSync(cwd)) run('git', ['worktree', 'remove', '--force', cwd]);
  rmSync(temp, { recursive: true });
}
