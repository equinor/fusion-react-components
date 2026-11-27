# General

> we encourage everyone/anyone to contribute to our code 🤗, but please read our guide.

This is a mono-repo and relies and conventional commits and sequential commits.

- Follow the guidelines [Fusion Docs](https://docs.fusion-dev.net/development/frontend/code-quality/)
- Use conventional commit messages
- Preferably use rebase instead of merging `main`
- Preferably keep PR small and scoped to package

```
fix(MY_PACKAGE): change background color

description
```

# Setup

## Agent context

Agent skills are declared individually in [apm.yml](./apm.yml), resolved in
[apm.lock.yaml](./apm.lock.yaml), and deployed under `.agents/skills/`.
See [agent context maintenance](./AGENT_CONTEXT.md) for locked restoration,
validation, updates, and the legacy ownership reconciliation. Do not use `npx skills`
or edit APM-managed copies directly.

## Install

We are using [Bun](https://bun.sh) as our package manager.

```sh
curl -fsSL https://bun.sh/install | bash
bun install
```

### Local dark-mode preview

On the dark-mode PR branch, use the shared Verdaccio instance at `http://127.0.0.1:4873`.
Start it and publish a commit-qualified Web Components snapshot first (see
[equinor/fusion-web-components#2551](https://github.com/equinor/fusion-web-components/pull/2551)).
Keep its verified `web-<web-short-sha>.json` and the registry's private `npmrc` in
`~/.config/fusion-dark-mode/`.

```sh
bun scripts/dark-mode-preview.js check 090f40d9 ec11c849421411f069ed73335271041128dd1ed5
bun scripts/dark-mode-preview.js publish 090f40d9 ec11c849421411f069ed73335271041128dd1ed5
```

These commands use Web commit `090f40d9` and React source `ec11c849`, which includes the
theme inheritance fix. Omit the full React commit to use `HEAD` for a new snapshot.
`check` installs exact upstream versions in a disposable checkout, verifies the registry URLs
and integrity hashes, then lints, builds, tests and packs without publishing. `publish` verifies
an existing matching manifest with a clean consumer install and reuses it. For a new snapshot,
it runs the same build checks, publishes under `dark-mode-<react-short-sha>-<web-short-sha>`,
verifies a clean install and writes a private `react-<react-short-sha>-<web-short-sha>.json`.
It does not replace existing versions, manifests, `dark-mode` or `latest`.

In a disposable Bun consumer checkout, with no existing `.npmrc`, point Bun at the same
registry. Use exact `packages[name].version` values from `react-ec11c849-090f40d9.json`
and `web-090f40d9.json` for direct preview dependencies. React snapshot tarballs already
pin their Web snapshot dependencies. Do not globally override incompatible transitive ranges.

```sh
ln -s "$HOME/.config/fusion-dark-mode/npmrc" .npmrc
bun install --registry=http://127.0.0.1:4873/
unlink .npmrc
```

Confirm the preview entries in the scratch lockfile match the manifests' versions and
integrities and use the loopback registry.
Keep the web components' published `@equinor/fusion-web-theme` `^0.1.12` dependency; use the
React preview's `0.2.0` only where the consumer's range admits it.
Do not commit the npmrc, preview overrides or lockfile changes. The normal install, CI and
public release still use the public registry.

## Start Storybook

StoryBook is not handling too well composite libraries, so a clean build is needed

```sh
bun run build
bun run start
```

### Colour scheme (light / dark / system)

Use the **Colour scheme** toolbar item to switch the preview between System, Light and Dark.
The decorator in `storybook/.storybook/preview.tsx` always sets an explicit `light` or `dark`
`data-color-scheme` on the preview `<html>`, the way the Fusion portal passes the scheme down.
For System it resolves `prefers-color-scheme` with `matchMedia` and updates the attribute when
the OS setting changes, as the portal does.
`ThemeProvider` inherits it, and content portaled to `body` follows it too. The body uses the EDS
neutral surface background and text colours from `preview-head.html`.
Follow the EDS
[colour scheme detection](https://eds.equinor.com/docs/foundation/colour/getting_started#colour-scheme-detection)
guidance.

Run the regression checks with:

```sh
bun run --cwd storybook test
```

The checks verify that `preview-head.html` does not force a scheme. They also render an
EDS CSS colour variable and the classic (EDS 2.x) colour mapping in headless Chromium for Light,
Dark and System (with light and dark `prefers-color-scheme`) and assert each matches the explicit
scheme. They also unit test how System resolves and follows OS changes. Install the browser once
with `bun run --cwd storybook test:setup`.

For browser verification, check an ordinary story, its Docs canvas and body-portaled content
(Tooltip, Menu, Popover, Dialog, Scrim) in each toolbar scheme, and switch the OS preference
while System is selected.

### Colours

Style components with EDS CSS custom properties (`var(--eds-color-…)`), not the JavaScript
`tokens` object from `@equinor/eds-tokens`, whose colours are static light values. Do not
hard-code colours or add literal fallbacks inside `var()`.

Use the stable `@equinor/eds-core-react` 2.x components. They read classic `--eds_*` colour
properties, which the root `ThemeProvider` from `@equinor/fusion-react-styles` maps to EDS colour
variables in dark mode only (see `classicColourDeclarations` in its README). Do not wrap or restyle
them per component for dark mode.

## Development

While Storybook is running open a new terminal and compile the project

```sh
cd packages/PACKAGE_NAME
bun exec tsc -w
```

# Add a new component

- Add a new directory under packages
- Add `package.json` (or copy from existing project and modify)
- Add `tsconfig.json` (or copy from existing project and modify)
- Include package in base `tsconfig.json`
```json
{
  "references": [{ "path": "packages/MY_PACKAGE" }]
}
```

- run `bun run clean` and then `bun install` from root

## Add a dependency

```sh
cd packages/MY_COMPONENT
bun add @SCOPE/PACKAGE
```

## Refer to another package

- add the package as previously described
- update `tsconfig.config`

```json
{
  "references": [{ "path": "../SOME_PACKAGE" }]
}
```

## Update StoryBook

- update `storybook/tsconfig.json`
```json
{
  "references": [{ "path": "../packages/MY_PACKAGE" }]
}
```

- add infopage `storybook/src/stories/MY_PACKAGE/component.stories.mdx`

```md
import { Meta, Story, Canvas, ArgsTable,Description } from '@storybook/addon-docs';
import { ChangeLog, PackageInfo, StoryExample } from '../../components';
import MY_COMPONENT from '@equinor/fusion-react-MY_COMPONENT/src/MY_COMPONENT';

<Meta title="Input/MY_COMPONENT" component={MY_COMPONENT} />

<PackageInfo pkg={require('@equinor/fusion-react-MY_COMPONENT/package.json')} />

## Component

<ArgsTable of={MY_COMPONENT} />

## DEMO 

<StoryExample storyId="examples-MY_COMPONENT--DEMO" showSource/>

## Changelog

<ChangeLog changelogs={{
react: require('@equinor/fusion-react-MY_COMPONENT/CHANGELOG.md')
}}/>
```
> the template might change, look at other stories

- add a stories `storybook/src/stories/MY_PACKAGE/component.stories.tsx`, add stories to the info page by refering the id to the `StoryExample` component

- add component snapshots `storybook/src/stories/MY_PACKAGE/snapshots.stories.tsx|mdx`
> add stories for possible states of the component
>
> group similar states into one story/snapshot

# Creating a PR

> **DO NOT** create a PR before code is ready for review/alpha/beta, since each push eats up story snapshots

- [x] make sure that the repo compiles `bun run build`
- [x] make sure code is semantic correct `bun run lint`
- [x] is the bug/feature ready for review?!
- [x] does all test on GH run without fails

When the commit is rebased/merge into `main`, GH will deploy all affected packages to NPM

## Creating an Alpha

- navigate to `Action` pane in GitHub
- Select the `pre-release` action
- Select the branch witch you want to release
- input a unique name or the number of your pr `pr-XXX`
- run workflow

# Troubleshoot

**Storybook wont compile 😡**

```sh
bun run clean && bun install
```

**Watcher does not work**

```sh
bun add -g typescript@latest
```

# Bun releases & the custom publish script

Releases are driven by [Changesets](https://github.com/changesets/changesets). When a release PR is
merged into `main`, the workflow versions the affected packages and runs `scripts/publish.js` to
publish them to NPM.

## Why we have a custom publish script

We publish with `npm publish` (for provenance/OIDC) but pack with `bun pm pack`. In a monorepo with
internal `workspace:*` dependencies this combination has a footgun caused by two Bun bugs:

- `bun pm pack` resolves `workspace:*` ranges from `bun.lock`, not from the sibling's `package.json`
  ([oven-sh/bun#20477](https://github.com/oven-sh/bun/issues/20477)).
- `bun install` does not refresh those workspace version records in `bun.lock` after a version bump
  ([oven-sh/bun#18906](https://github.com/oven-sh/bun/issues/18906)).

Together they mean a freshly bumped package can be published pinning a **stale** version of an
internal dependency (e.g. `@equinor/fusion-react-person` shipping with an outdated
`@equinor/fusion-react-utils`). Deleting/regenerating `bun.lock` would fix it, but our policy is to
never delete the lockfile.

Instead, `scripts/publish.js` resolves every `workspace:*` range to the concrete version read from
each sibling's on-disk `package.json` immediately before packing, then restores the original file —
exactly what `bun publish` / `pnpm publish` do internally. This is independent of `bun.lock`, so the
correct versions are always shipped.

## Migrating away from it

This script is a workaround, not a permanent solution. **Once Bun fixes the bugs above, remove the
`workspace:*` resolution logic** (`workspaceVersions`, `resolveWorkspaceRange`, `resolveWorkspaceDeps`,
and the temporary `package.json` rewrite in the packing loop) and let `bun pm pack` resolve versions
on its own. Track these issues for the green light:

- [oven-sh/bun#18906](https://github.com/oven-sh/bun/issues/18906) — lockfile not refreshed after version bumps.
- [oven-sh/bun#20477](https://github.com/oven-sh/bun/issues/20477) — `bun pm pack` reads versions from the lockfile.

When `bun publish` also supports `--provenance` and npm OIDC trusted publishing
([oven-sh/bun#15601](https://github.com/oven-sh/bun/issues/15601)), the entire `npm publish` step can
likely be replaced with `bun publish`, removing the script altogether.
