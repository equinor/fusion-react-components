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

We are using pnpm as our package manager. Read more about pnpm [here](https://pnpm.io/motivation)

```sh
npm install pnpm -g
pnpm install
```

## Start Storybook

StoryBook is not handling too well composite libraries, so a clean build is needed 

```sh
pnpm build
pnpm start
```

## Development

While Storybook is running open a new terminal and compile the project

```sh
cd packages/PACKAGE_NAME
tsc -w
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
+ run `pnpm clean` and then `pnpm install` from root

## Add a dependency

```sh
lerna add @SCOPE/PACKAGE --scope @equinor/fusion-react-MY_COMPONENT
````

> alternative add with regular `pnpm add @SCOPE/PACKAGE` in the package dir, but the project need to be bootstrapped again.

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

- [x] make sure that the repo compiles `pnpm build`
- [x] make sure code is semantic correct `pnpm lint`
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
pnpm clean && pnpm i
```

__Watcher does not work__
```sh
pnpm add -g typescript@latest
```



