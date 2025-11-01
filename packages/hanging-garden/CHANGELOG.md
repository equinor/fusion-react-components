# Change Log

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

## 1.7.8

## 1.7.7

### Patch Changes

- f989cb4: re-release, no changes

## 1.7.6

## 1.7.5

### Patch Changes

- 6af9c2c: build(deps): bump date-fns from 3.3.1 to 4.1.0

## 1.7.4

## 1.7.3

### Patch Changes

- fbf66eb: build(deps): bump date-fns from 2.28.0 to 3.2.0

## 1.7.2

## 1.7.1

### Patch Changes

- 6f15f585: fix(hanging-garden): use scrollbar gutter to avoid weird behaviour

## 1.7.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- Updated dependencies [60e68683]
  - @equinor/fusion-react-styles@0.6.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.6.33](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.32...@equinor/fusion-react-hanging-garden@1.6.33) (2023-09-21)

### Bug Fixes

- **react-components:** lint fixes ([ef85499](https://github.com/equinor/fusion-react-components/commit/ef85499903c09bb57c8b99e66af2b3125f2e0569))

## [1.6.32](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.31...@equinor/fusion-react-hanging-garden@1.6.32) (2023-09-20)

### Bug Fixes

- **react-components:** type fixes ([d649878](https://github.com/equinor/fusion-react-components/commit/d64987816a5c1268ce15947964fb7e2735ed6868))

## 1.6.31 (2023-09-18)

### Bug Fixes

- **react-components:** lint errors ([28031ec](https://github.com/equinor/fusion-react-components/commit/28031ecf22b3e405a8a3c797b7e6351bd8547f9d))
- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## [1.6.30](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.29...@equinor/fusion-react-hanging-garden@1.6.30) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.29 (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.28 (2023-07-13)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.27 (2023-06-16)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.26 (2022-09-16)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.25](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.24...@equinor/fusion-react-hanging-garden@1.6.25) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.24 (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.23 (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.22](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.21...@equinor/fusion-react-hanging-garden@1.6.22) (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.21 (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.20](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.19...@equinor/fusion-react-hanging-garden@1.6.20) (2022-01-03)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.19 (2022-01-03)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.18](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.17...@equinor/fusion-react-hanging-garden@1.6.18) (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.17](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.16...@equinor/fusion-react-hanging-garden@1.6.17) (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.16](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.15...@equinor/fusion-react-hanging-garden@1.6.16) (2021-11-22)

### Bug Fixes

- style rules ([7126199](https://github.com/equinor/fusion-react-components/commit/7126199dfb224b8bf8ac7e72874750ad3b88ca60))

## 1.6.15 (2021-11-22)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.14 (2021-11-08)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.13](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.12...@equinor/fusion-react-hanging-garden@1.6.13) (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.12 (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.11 (2021-10-27)

### Bug Fixes

- added skeleton component ([cf9770c](https://github.com/equinor/fusion-react-components/commit/cf9770ccf9916944cd307c9571577b09e1b41fe4))

## 1.6.10 (2021-10-21)

### Bug Fixes

- error types for fetching garden data ([7d57ef8](https://github.com/equinor/fusion-react-components/commit/7d57ef8a768b2c4fbbbacd4364e35acb4ba61b82))

## 1.6.9 (2021-10-13)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.7...@equinor/fusion-react-hanging-garden@1.6.8) (2021-10-11)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.6...@equinor/fusion-react-hanging-garden@1.6.7) (2021-09-30)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.6 (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.4...@equinor/fusion-react-hanging-garden@1.6.5) (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.3...@equinor/fusion-react-hanging-garden@1.6.4) (2021-09-23)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.3 (2021-09-16)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.6.2 (2021-09-08)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.6.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.6.0...@equinor/fusion-react-hanging-garden@1.6.1) (2021-09-07)

### Bug Fixes

- linting ([7cb89a8](https://github.com/equinor/fusion-react-components/commit/7cb89a8b2fdb3d78b4ff947b732c974cfe92f61a))
- type cast error of error ([ca96c28](https://github.com/equinor/fusion-react-components/commit/ca96c2883c62066cb82e9853e8eec9540faafd0c))

# 1.6.0 (2021-09-06)

### Features

- padding option and new dashed highlight border around packages ([68a9eaf](https://github.com/equinor/fusion-react-components/commit/68a9eaf672fc7f02729d9d39fa7790a591fbf229))

# 1.5.0 (2021-08-23)

### Bug Fixes

- changed erroMessageProps with any types to unknown ([5ac75ab](https://github.com/equinor/fusion-react-components/commit/5ac75ab6361eae5603a038611684b069e45ecbff))

### Features

- added the group by multiple level functionaly that was build for the swcr garden app ([4878ab9](https://github.com/equinor/fusion-react-components/commit/4878ab9a2769cb1aea104cfe8962b7c1f64ceeee))

## 1.4.3 (2021-07-14)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.4.2 (2021-07-05)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.4.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.4.0...@equinor/fusion-react-hanging-garden@1.4.1) (2021-06-30)

### Bug Fixes

- ensure that the scroll to calcualtion does not endup being below 0 ([1f64d86](https://github.com/equinor/fusion-react-components/commit/1f64d861d00cb7eb9d349bdbc1ef78c0b49ac9aa))

# [1.4.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.3.0...@equinor/fusion-react-hanging-garden@1.4.0) (2021-06-28)

### Bug Fixes

- a minor hack to get control over the caches ([20a14df](https://github.com/equinor/fusion-react-components/commit/20a14df2391f21487eafcb63bd5bc63bc778db62))
- handle onload error ([3813f5e](https://github.com/equinor/fusion-react-components/commit/3813f5e04e7c728bbe9a9c23557106b60d4f1b67))

### Features

- added a new setting: disableScrollToHighlightedItem ([e9bcb0b](https://github.com/equinor/fusion-react-components/commit/e9bcb0b728133ed7b4f82c0c5a3f9d093e32d98c))

# [1.3.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.2.0...@equinor/fusion-react-hanging-garden@1.3.0) (2021-06-28)

### Bug Fixes

- a minor hack to get control over the caches ([20a14df](https://github.com/equinor/fusion-react-components/commit/20a14df2391f21487eafcb63bd5bc63bc778db62))
- handle onload error ([3813f5e](https://github.com/equinor/fusion-react-components/commit/3813f5e04e7c728bbe9a9c23557106b60d4f1b67))

### Features

- added a new setting: disableScrollToHighlightedItem ([e9bcb0b](https://github.com/equinor/fusion-react-components/commit/e9bcb0b728133ed7b4f82c0c5a3f9d093e32d98c))

# 1.2.0 (2021-06-28)

### Features

- add color blind mode to hanging carden component and cache key ([53aea21](https://github.com/equinor/fusion-react-components/commit/53aea2115f2d8907e61661a8bb256fe4c519c6b9))

## [1.1.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.1.2...@equinor/fusion-react-hanging-garden@1.1.3) (2021-06-23)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## 1.1.2 (2021-06-17)

### Bug Fixes

- fixed linting ([aa160f8](https://github.com/equinor/fusion-react-components/commit/aa160f8a460256fe7cc86947d031826b34a190c4))

## [1.1.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.1.0...@equinor/fusion-react-hanging-garden@1.1.1) (2021-03-23)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

# [1.1.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.0.1-alpha.2...@equinor/fusion-react-hanging-garden@1.1.0) (2021-03-23)

### Bug Fixes

- added styled-componets dependency to garden component ([c6fae60](https://github.com/equinor/fusion-react-components/commit/c6fae607920b834642b48c32e39f983460f2d350))
- remove styled-components ([c26029e](https://github.com/equinor/fusion-react-components/commit/c26029e41a9a8d7539c45dbe7a912944408a1313))

## [1.0.1-alpha.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.0.1-alpha.1...@equinor/fusion-react-hanging-garden@1.0.1-alpha.2) (2021-02-26)

**Note:** Version bump only for package @equinor/fusion-react-hanging-garden

## [1.0.1-alpha.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-hanging-garden@1.0.1-alpha.0...@equinor/fusion-react-hanging-garden@1.0.1-alpha.1) (2021-02-26)

### Bug Fixes

- minor tweak to render queue ([3fc6be1](https://github.com/equinor/fusion-react-components/commit/3fc6be1c11531e5ccb9d9b8416edb9bb14afe311))

## 1.0.1-alpha.0 (2021-02-25)

### Bug Fixes

- safari scrolling ([069096b](https://github.com/equinor/fusion-react-components/commit/069096b1570655e393ad40c65e1667579c1bdebc))
