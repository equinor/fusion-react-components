# Change Log

## 33.0.0

### Major Changes

- fbc8188: React 19 compatibility fixes
  - Fixed TypeScript errors related to React 19 type changes
  - Updated `useRef` calls to provide initial values when type is explicitly specified
  - Fixed `HTMLDivElement` type usage to use `Partial<HTMLAttributes<HTMLDivElement>>`
  - Fixed `useFilterSelection` observable type handling for `Set<T>` return type
  - Added proper type annotations for web components
  - Updated component prop types to be compatible with React 19's stricter type checking

  Reference https://github.com/equinor/fusion/issues/696

  Devops: AB#65644

  Thanks to @AndreasPrestHammer for reporting this issue!

## 32.0.2

### Patch Changes

- 83fb492: Remove ag-grid-community and use @equinor/fusion-framework-react-ag-grid instead

## 32.0.1

### Patch Changes

- 63b7e92: Change to biome linting rules

## 32.0.0

### Major Changes

- 8a5ddb6: Update 'ag-grid-utils' to AG-Grid 33

## 31.2.4

### Patch Changes

- f989cb4: re-release, no changes

## 31.2.3

### Patch Changes

- 2606cc9: Update eds-core-react deps

## 31.2.2

### Patch Changes

- b76ff35: build(deps-dev): bump the ag-grid group across 1 directory with 4 updates

  Updating ag-grid to 32.0.2

## 31.2.1

### Patch Changes

- 5399cea: Updating aggrid to latest licenced version

## 31.2.0

### Minor Changes

- 43978ba: Aligning aggrid version with framework

## 30.2.2

### Patch Changes

- 5e10a53: removed `@equinor/fusion-react-icon`

## 30.2.1

### Patch Changes

- cb99230: **@equinor/fusion-react-ag-grid-utils:**
  - Updated README
  - updated Ag Grid to `~30.2.0`
  - refactor compare function (lifted resolve of comparer)
  - fixed value getter for status field (triggers change check)
  - changed styling from fusion-style to styled components
  - replaced fusion icon with EDS icon

  **@equinor/fusion-react-storybook:**
  - added example for using change-handler and status component
  - cleaned up deps

## 29.4.1

### Patch Changes

- c9dddba7: fix missing deps

## 29.4.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 29.3.5 (2023-09-18)

### Bug Fixes

- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## 29.3.4 (2023-06-09)

**Note:** Version bump only for package @equinor/fusion-react-ag-grid-utils

# 0.5.0 (2023-01-20)

### Features

- added extra status column in ag grid statuc column ([4604d8a](https://github.com/equinor/fusion-react-components/commit/4604d8a8feba5a107b42c3094c55f490b8f52bed))

## 0.4.4 (2023-01-03)

### Bug Fixes

- ag-grid-utils, not show status for row group ([a51bd58](https://github.com/equinor/fusion-react-components/commit/a51bd5842aacfc1968983cfa35d308a4da2efec9))

## 0.4.3 (2022-10-27)

### Bug Fixes

- **ag-grid-utils:** Added optional chaining operators to props.data in StatusComponent ([fbdc55f](https://github.com/equinor/fusion-react-components/commit/fbdc55fbb553ea2ac02add20c0142eac43ad079f))

## [0.4.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ag-grid-utils@0.4.1...@equinor/fusion-react-ag-grid-utils@0.4.2) (2022-10-10)

### Bug Fixes

- **@ag-grid-community:** adds [@ag-grid-community](https://github.com/ag-grid-community) as dev & peer dependency ([dfaa3c6](https://github.com/equinor/fusion-react-components/commit/dfaa3c685e8cefa8dde2cbee60f3c1f3e08dfa25))
- **ag-grid-utils:** change ag-grid-community to @ag-grid-community/core ([f02db41](https://github.com/equinor/fusion-react-components/commit/f02db4105ac22a9891bd6163af9706fec0c7f601))

## 0.4.1 (2022-10-06)

**Note:** Version bump only for package @equinor/fusion-react-ag-grid-utils

# 0.4.0 (2022-09-20)

### Bug Fixes

- fixed wrong styling on previous pr for ag grid styling ([300dad0](https://github.com/equinor/fusion-react-components/commit/300dad078a08381de4f18370eee3197a9a426e52))

### Features

- added centering on exandable ag grid cells ([7434cdf](https://github.com/equinor/fusion-react-components/commit/7434cdf4e543dc200b3bf4d7a7d5696d64ed1518))

## [0.3.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ag-grid-addons@0.3.1...@equinor/fusion-react-ag-grid-addons@0.3.2) (2022-07-27)

### Bug Fixes

- fixed wrong styling on previous pr for ag grid styling ([300dad0](https://github.com/equinor/fusion-react-components/commit/300dad078a08381de4f18370eee3197a9a426e52))

## 0.3.1 (2022-07-27)

**Note:** Version bump only for package @equinor/fusion-react-ag-grid-addons

# [0.3.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ag-grid-addons@0.2.1...@equinor/fusion-react-ag-grid-addons@0.3.0) (2022-05-11)

### Features

- added custom background color for ag grid selected row ([06345c0](https://github.com/equinor/fusion-react-components/commit/06345c02569292c08b0e6c494061506582e5f357))

## [0.2.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ag-grid-addons@0.2.0...@equinor/fusion-react-ag-grid-addons@0.2.1) (2022-04-28)

### Bug Fixes

- Ag grid - Added defaultOption export in index ([cde6110](https://github.com/equinor/fusion-react-components/commit/cde611021db0cfd21ca6f631abf2a4765cc844c3))

# 0.2.0 (2022-04-28)

### Bug Fixes

- added export in index ([e9fd3e2](https://github.com/equinor/fusion-react-components/commit/e9fd3e2dae78de5df682843b0ed8b8bc69af09b0))
- eslint errors ([db5af7d](https://github.com/equinor/fusion-react-components/commit/db5af7d4f41f16a4e41a6e52b9f5623046989cbe))

### Features

- change handler utils ([6ceb119](https://github.com/equinor/fusion-react-components/commit/6ceb119725ca515cfac6d9a73c9c20bee1fd9b3b))

# 0.1.0 (2022-03-28)

### Bug Fixes

- removed custom styling, but kept it commented to be used as a example ([c0fb107](https://github.com/equinor/fusion-react-components/commit/c0fb107087a9c3b52f18aaa3f368f0e0dadeee4d))

### Features

- AgStyles module ([9ce9290](https://github.com/equinor/fusion-react-components/commit/9ce92909013ae37c319f494225253a558f2d7781))
