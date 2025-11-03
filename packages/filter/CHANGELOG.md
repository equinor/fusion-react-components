# Change Log

## 2.0.1

### Patch Changes

- Updated dependencies [07a06d2]
- Updated dependencies [0a1bf8d]
  - @equinor/fusion-react-styles@2.0.0

## 2.0.1-preview.0

### Patch Changes

- Updated dependencies [07a06d2]
  - @equinor/fusion-react-styles@2.0.0-preview.0

## 2.0.0

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

### Patch Changes

- Updated dependencies [fbc8188]
  - @equinor/fusion-react-styles@1.0.0
  - @equinor/fusion-react-utils@3.0.0

## 1.8.8

### Patch Changes

- 65d1b87: Refactor for Biome linter compliance
  - Update Biome configuration to version 2.2.5
  - Fix useEffect dependencies in Stepper component
  - Refactor SideSheet Top component to fix linter warnings
  - Add proper biome-ignore comments for necessary `any` types

## 1.8.7

### Patch Changes

- 63b7e92: Change to biome linting rules

## 1.8.6

### Patch Changes

- f989cb4: re-release, no changes

## 1.8.5

### Patch Changes

- 0d6c000: update wc-components to latest

## 1.8.4

### Patch Changes

- cd87cca: Updating @equinor/eds-core-react to 0.37.0

## 1.8.3

### Patch Changes

- d07f10a: - Exported various components and types from different files.
  - Updated exports to use the `type` keyword for certain types.

## 1.8.2

### Patch Changes

- 13c0ca4: deprecated `@equinor/fusion-react-button`
- 5e10a53: removed `@equinor/fusion-react-icon`

## 1.8.1

### Patch Changes

- 38ba120f: remove button from filter

## 1.8.0

### Minor Changes

- b0758ca7: replaced `@equinor/fusion-react-textinput` with EDS

### Patch Changes

- Updated dependencies [82e8cb02]
  - @equinor/fusion-react-radio@0.6.0

## 1.7.1

### Patch Changes

- Updated dependencies [9fb0891c]
  - @equinor/fusion-react-textinput@0.8.0

## 1.7.0

### Minor Changes

- 5854d91a: deprecate @equinor/fusion-react-checkbox

## 1.6.0

### Minor Changes

- 69654898: deprecated @equinor/fusion-react-observable

### Patch Changes

- b762221a: removed `@equinor/fusion-react-chip`

## 1.5.1

### Patch Changes

- 35ae000b: deprecated chip
- Updated dependencies [35ae000b]
  - @equinor/fusion-react-chip@0.5.0

## 1.5.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- 60e68683: fixed missing dependencies
- Updated dependencies [60e68683]
- Updated dependencies [60e68683]
  - @equinor/fusion-react-button@0.9.0
  - @equinor/fusion-react-observable@1.2.0
  - @equinor/fusion-react-textinput@0.7.0
  - @equinor/fusion-react-checkbox@0.6.0
  - @equinor/fusion-react-styles@0.6.0
  - @equinor/fusion-react-radio@0.5.0
  - @equinor/fusion-react-utils@2.1.0
  - @equinor/fusion-react-chip@0.4.0
  - @equinor/fusion-react-icon@0.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.4.19](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.18...@equinor/fusion-react-filter@1.4.19) (2023-10-03)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.18 (2023-09-29)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.4.17](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.16...@equinor/fusion-react-filter@1.4.17) (2023-09-21)

### Bug Fixes

- **react-components:** lint fixes ([ef85499](https://github.com/equinor/fusion-react-components/commit/ef85499903c09bb57c8b99e66af2b3125f2e0569))

## [1.4.16](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.15...@equinor/fusion-react-filter@1.4.16) (2023-09-20)

### Bug Fixes

- **react-components:** type fixes ([d649878](https://github.com/equinor/fusion-react-components/commit/d64987816a5c1268ce15947964fb7e2735ed6868))

## 1.4.15 (2023-09-18)

### Bug Fixes

- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## [1.4.14](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.13...@equinor/fusion-react-filter@1.4.14) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.13 (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.12 (2023-07-13)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.11 (2023-07-12)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.4.10](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.9...@equinor/fusion-react-filter@1.4.10) (2023-06-19)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.9 (2023-06-16)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.8 (2023-03-28)

### Bug Fixes

- **react-components:** lint fix ([750ee07](https://github.com/equinor/fusion-react-components/commit/750ee07ffe87c40afe0a170e387eb4ae0f903bd5))

## 1.4.7 (2023-02-14)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.4.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.5...@equinor/fusion-react-filter@1.4.6) (2023-02-06)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.4.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.4.4...@equinor/fusion-react-filter@1.4.5) (2023-02-03)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.4 (2023-01-30)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.3 (2023-01-18)

### Bug Fixes

- :bug: button import fix ([b1e3e5c](https://github.com/equinor/fusion-react-components/commit/b1e3e5c65b558c5ed3303103f50c3e2610249474))

## 1.4.2 (2023-01-12)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.4.1 (2022-11-21)

**Note:** Version bump only for package @equinor/fusion-react-filter

# 1.4.0 (2022-11-07)

### Features

- the filterpanel component now takes in a search function prop to use in seachbar ([09d05b9](https://github.com/equinor/fusion-react-components/commit/09d05b9e822ecccdbefc986fb9ebe93d8df7fa12))

## [1.3.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.3.7...@equinor/fusion-react-filter@1.3.8) (2022-09-16)

### Bug Fixes

- **filter:** fix typing ([ed1ccd5](https://github.com/equinor/fusion-react-components/commit/ed1ccd56872c76451ff0788d5a87a8ed49c8282c))

## 1.3.7 (2022-09-16)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.3.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.3.5...@equinor/fusion-react-filter@1.3.6) (2022-06-29)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.3.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.3.4...@equinor/fusion-react-filter@1.3.5) (2022-06-15)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.3.4 (2022-06-14)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.3.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.3.2...@equinor/fusion-react-filter@1.3.3) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.3.2 (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.3.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.3.0...@equinor/fusion-react-filter@1.3.1) (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-filter

# 1.3.0 (2022-02-15)

### Features

- **filter:** add sortfn as a prop and capitalized all label ([c364ab3](https://github.com/equinor/fusion-react-components/commit/c364ab39b6b625cf00b973f1eacb52c5b795ae27))

## [1.2.13](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.12...@equinor/fusion-react-filter@1.2.13) (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.2.12 (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.2.11 (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.2.10](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.9...@equinor/fusion-react-filter@1.2.10) (2022-01-19)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.2.9 (2022-01-13)

### Bug Fixes

- **fikter:** optimize filter provider ([6605bb0](https://github.com/equinor/fusion-react-components/commit/6605bb08878f41f6957d2f4b4711ecafdee888d3))

## 1.2.8 (2022-01-04)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.2.7 (2022-01-03)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.2.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.5...@equinor/fusion-react-filter@1.2.6) (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.2.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.4...@equinor/fusion-react-filter@1.2.5) (2021-11-22)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.2.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.3...@equinor/fusion-react-filter@1.2.4) (2021-11-22)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.2.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.2...@equinor/fusion-react-filter@1.2.3) (2021-11-15)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.2.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.2.1...@equinor/fusion-react-filter@1.2.2) (2021-11-08)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.2.1 (2021-11-04)

**Note:** Version bump only for package @equinor/fusion-react-filter

# [1.2.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.15...@equinor/fusion-react-filter@1.2.0) (2021-11-02)

### Bug Fixes

- enhance checkbox filter ([3dc40a5](https://github.com/equinor/fusion-react-components/commit/3dc40a597f8a87879aa551d5d09b127fc683f21c))
- **filter:** add title for filter ([25215ac](https://github.com/equinor/fusion-react-components/commit/25215ace8ce88e01b73395bc2bee862941e12b79))
- **filter:** adjust styling of filter ([c59bac3](https://github.com/equinor/fusion-react-components/commit/c59bac30f8739cd4f6f57c9b8c24adc8856747b5))
- **filter:** allow filter items to frow ([84dfd9d](https://github.com/equinor/fusion-react-components/commit/84dfd9d797217dcf1c461699cbde14cffafe96d2))
- **filter:** change overflow to auto ([b7e5f95](https://github.com/equinor/fusion-react-components/commit/b7e5f9574c2b4e6f586dc5e683e6f66a9f15659d))
- **filter:** expose style attributes ([f68cf16](https://github.com/equinor/fusion-react-components/commit/f68cf1694972cdadbf045d16ab81825a885e6f00))
- **filter:** make checkbox counter no wrap ([a005e61](https://github.com/equinor/fusion-react-components/commit/a005e61671d9a559e536610cbed73d534072b7c6))

### Features

- **filter:** add basic checkbox filter ([e99331d](https://github.com/equinor/fusion-react-components/commit/e99331d6146cca5ad904d1ed18f296220b9fd00f))
- **filter:** add button for resetting filters ([b2a81c3](https://github.com/equinor/fusion-react-components/commit/b2a81c3a2bc00896a23004bb14a204ed6648754d))
- **filter:** add container for filter components ([9c9c5ef](https://github.com/equinor/fusion-react-components/commit/9c9c5ef11562c6b98da1e39177a73f154c14613c))
- **filter:** add hook for attaching filter to context ([dfb853c](https://github.com/equinor/fusion-react-components/commit/dfb853c1d99edf1ceec7fcbd91e9731c65c44ef1))
- **filter:** add hook for clearing selection in filter context ([f2e9996](https://github.com/equinor/fusion-react-components/commit/f2e9996411af0a8e3e26d9fd7457e70625f4c77f))
- **filter:** add hook for extracting selection by filter key ([ac927f4](https://github.com/equinor/fusion-react-components/commit/ac927f4ecebfbfe4c1edffc545da29e62ffca26a))
- **filter:** add hook for filtered data from context ([9431005](https://github.com/equinor/fusion-react-components/commit/943100539be2e97e373a11cbf6f588f1614b24ab))
- **filter:** add panel for hosting filter components and controllers ([8c8374d](https://github.com/equinor/fusion-react-components/commit/8c8374df1c6ba1036a4c4424464b27adbca5e76c))
- **filter:** add search filter ([6549647](https://github.com/equinor/fusion-react-components/commit/654964774bc6490a5973bfaead2ea671bf48f52b))
- **filter:** add selection chips ([da9cf43](https://github.com/equinor/fusion-react-components/commit/da9cf43bb04c511ab52b6f5d4bb6e7b2a73b61fc))
- **filter:** create provider for filter options ([734ea5b](https://github.com/equinor/fusion-react-components/commit/734ea5bc7b4a533852d2577fa8027985efbecbc5))
- **filter:** recreate base state of filter ([a5924d3](https://github.com/equinor/fusion-react-components/commit/a5924d3a8a212e68e95548fd6c92301a8e7b44ce))

## [1.1.15](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.14...@equinor/fusion-react-filter@1.1.15) (2021-10-29)

### Bug Fixes

- updated packages ([4298c77](https://github.com/equinor/fusion-react-components/commit/4298c778c4c5385398a92d8b71feee3b17ba64c0))

## 1.1.14 (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.1.13](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.12...@equinor/fusion-react-filter@1.1.13) (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.1.12 (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.1.11](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.10...@equinor/fusion-react-filter@1.1.11) (2021-10-18)

### Bug Fixes

- **filter:** epic unused imports ([946f5dc](https://github.com/equinor/fusion-react-components/commit/946f5dc3c0963d5a1094795b17ae591cd200edd7))

## [1.1.10](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.9...@equinor/fusion-react-filter@1.1.10) (2021-10-13)

### Bug Fixes

- **filter:** typehint ([1afc7a8](https://github.com/equinor/fusion-react-components/commit/1afc7a809cec11e0e0d75e1277ae4cd28464ddaf))

## [1.1.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.7...@equinor/fusion-react-filter@1.1.9) (2021-10-13)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.1.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.7...@equinor/fusion-react-filter@1.1.8) (2021-10-05)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.1.7 (2021-10-05)

### Bug Fixes

- update event listeners for textinput ([efa551e](https://github.com/equinor/fusion-react-components/commit/efa551e8e15dbdc3fb0144e459b68693f336e8a3))

## [1.1.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.5...@equinor/fusion-react-filter@1.1.6) (2021-09-30)

**Note:** Version bump only for package @equinor/fusion-react-filter

## 1.1.5 (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.1.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.3...@equinor/fusion-react-filter@1.1.4) (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.1.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.2...@equinor/fusion-react-filter@1.1.3) (2021-09-23)

**Note:** Version bump only for package @equinor/fusion-react-filter

## [1.1.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-filter@1.1.1...@equinor/fusion-react-filter@1.1.2) (2021-09-16)

### Bug Fixes

- remove typescript from sub packages ([845115e](https://github.com/equinor/fusion-react-components/commit/845115e1a73687ce75dc3e14ebdebf9463481b28))

## 1.1.1 (2021-09-14)

**Note:** Version bump only for package @equinor/fusion-react-filter

# 1.1.0 (2021-09-10)

### Bug Fixes

- Added useSelector and reducer from fusion API ([693973e](https://github.com/equinor/fusion-react-components/commit/693973eb1adc1e4b4e97e73b89f23d7c6ce44d85))
- corrected some conflicts created by previouis commit ([389bd1c](https://github.com/equinor/fusion-react-components/commit/389bd1c9d6b98fd4e84091c061bbc883757bf006))
- fixed searchboxes. onInput no longer worked, changed to use onChange ([e270177](https://github.com/equinor/fusion-react-components/commit/e270177137baa619ba238e03350e4e131ad68f95))
- mandatory filters are now disabled in the filter selector ([f4c4bbb](https://github.com/equinor/fusion-react-components/commit/f4c4bbb7542743cce8bb3cac584b2b072297b2bd))
- moved click handling for checkboxes into the onInput props ([b45aced](https://github.com/equinor/fusion-react-components/commit/b45aced7a1886277d10b4c546113d90600b59676))
- removed console log ([6422fee](https://github.com/equinor/fusion-react-components/commit/6422feea305bb51f7f9a5f6237da2be5cb859822))
- search functionality, css adjustments and description ([e187592](https://github.com/equinor/fusion-react-components/commit/e18759227012eac564d36972d58a6362cdf30d43))
- TSelection import in CheckboFilter corrected. ([7a5dab4](https://github.com/equinor/fusion-react-components/commit/7a5dab497cc2456c8200580e73051efb63db454b))
- TSelection in Checkbox filter was not imported correctly ([797f76e](https://github.com/equinor/fusion-react-components/commit/797f76e8ea3b871920f0e4f0c7c4a929a6cbfede))
- updated the Chips to be a bit more EDS like ([902cb38](https://github.com/equinor/fusion-react-components/commit/902cb38318d2000f20c763582908826eb24eb7d2))

### Features

- barebones filter panel with no UI elements ([972b125](https://github.com/equinor/fusion-react-components/commit/972b125fcff95a102e5b900cfabb2295cea9e652))
- Moved over and implemented most of the components used for horizontal filterl ([b1a80c1](https://github.com/equinor/fusion-react-components/commit/b1a80c1bf8fb8e1ca4230236083f14da0dd915ac))
- new hook useFilterContext ([322dd0c](https://github.com/equinor/fusion-react-components/commit/322dd0cf3229461b9d6579474147e775082b406e))
