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

## Install

We are using [Bun](https://bun.sh) as our package manager.

```sh
curl -fsSL https://bun.sh/install | bash
bun install
```

## Start Storybook

StoryBook is not handling too well composite libraries, so a clean build is needed 

```sh
bun run build
bun run start
```

## Development

While Storybook is running open a new terminal and compile the project

```sh
cd packages/PACKAGE_NAME
bun exec tsc -w
```

# Add a new component

+ Add a new directory under packages
+ Add `package.json` (or copy from existing project and modify)
+ Add `tsconfig.json` (or copy from existing project and modify)
+ Include package in base `tsconfig.json`
```json
{
  "references": [
    { "path": "packages/MY_PACKAGE" }
  ]
}
```
+ run `bun run clean` and then `bun install` from root

## Add a dependency

```sh
cd packages/MY_COMPONENT
bun add @SCOPE/PACKAGE
```

## Refer to another package

+ add the package as previously described
+ update `tsconfig.config`

```json
{
  "references": [
    { "path": "../SOME_PACKAGE" }
  ]
}
```

## Update StoryBook

+ update `storybook/tsconfig.json`
```json
{
  "references": [
    { "path": "../packages/MY_PACKAGE" }
  ]
}
```
+ add infopage `storybook/src/stories/MY_PACKAGE/component.stories.mdx`

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

+ add a stories `storybook/src/stories/MY_PACKAGE/component.stories.tsx`, add stories to the info page by refering the id to the `StoryExample` component

+ add component snapshots  `storybook/src/stories/MY_PACKAGE/snapshots.stories.tsx|mdx`
> add stories for possible states of the component
>
> group similar states into one story/snapshot

# Creating a PR

> __DO NOT__ create a PR before code is ready for review/alpha/beta, since each push eats up story snapshots

- [x] make sure that the repo compiles `bun run build`
- [x] make sure code is semantic correct `bun run lint`
- [x] is the bug/feature ready for review?!
- [x] does all test on GH run without fails

When the commit is rebased/merge into `main`, GH will deploy all affected packages to NPM

## Creating an Alpha

+ navigate to `Action` pane in GitHub
+ Select the `pre-release` action
+ Select the branch witch you want to release
+ input a unique name or the number of your pr `pr-XXX`
+ run workflow

# Troubleshoot

__Storybook wont compile 😡__
```sh
bun run clean && bun install
```

__Watcher does not work__
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


# Dependabot & Bun

Dependabot bumps versions in `package.json` but does **not** understand Bun's lockfile (`bun.lock`),
so its PRs leave the lockfile out of sync with the updated dependencies. Merging such a PR as-is can
break installs and CI steps that run with a frozen lockfile.

Before merging a Dependabot PR, refresh `bun.lock` locally and push it back to the PR branch:

```sh
# check out the Dependabot PR branch
gh pr checkout <PR_NUMBER>

# regenerate the lockfile from the updated package.json files
bun install

# commit and push the refreshed lockfile to the same branch
git commit -am "chore: update bun.lock"
git push
````

Do not delete bun.lock to update it — a plain bun install is enough here, since Dependabot
changed an actual dependency (Bun refreshes the lockfile when dependencies change, unlike a
workspace-only version bump).
