# Change Log

## 1.0.0

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
  - @equinor/fusion-react-utils@3.0.0

## 0.3.3

### Patch Changes

- 63b7e92: Change to biome linting rules

## 0.3.2

### Patch Changes

- f989cb4: re-release, no changes

## 0.3.1

### Patch Changes

- 0d6c000: update wc-components to latest

## 0.3.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- Updated dependencies [60e68683]
  - @equinor/fusion-react-utils@2.1.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.2.15 (2023-10-03)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## 0.2.14 (2023-09-18)

### Bug Fixes

- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## 0.2.13 (2022-11-21)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## [0.2.12](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-skeleton@0.2.11...@equinor/fusion-react-skeleton@0.2.12) (2022-06-29)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## [0.2.11](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-skeleton@0.2.10...@equinor/fusion-react-skeleton@0.2.11) (2022-06-15)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## 0.2.10 (2022-06-14)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## [0.2.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-skeleton@0.2.8...@equinor/fusion-react-skeleton@0.2.9) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## 0.2.8 (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## 0.2.7 (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## [0.2.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-skeleton@0.2.5...@equinor/fusion-react-skeleton@0.2.6) (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## 0.2.5 (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## 0.2.4 (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## [0.2.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-skeleton@0.2.2...@equinor/fusion-react-skeleton@0.2.3) (2021-11-02)

**Note:** Version bump only for package @equinor/fusion-react-skeleton

## [0.2.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-skeleton@0.2.1...@equinor/fusion-react-skeleton@0.2.2) (2021-10-29)

### Bug Fixes

- updated packages ([4298c77](https://github.com/equinor/fusion-react-components/commit/4298c778c4c5385398a92d8b71feee3b17ba64c0))

## 0.2.1 (2021-10-29)

### Bug Fixes

- **skeleton:** add missing prop for icon ([d59e6e0](https://github.com/equinor/fusion-react-components/commit/d59e6e018044cb394245607a05da2d066deb8076))

# 0.2.0 (2021-10-29)

### Features

- **skeleton:** add new builder ([c900967](https://github.com/equinor/fusion-react-components/commit/c90096718d477eeb3a6948d3fa34422ea0983e1d))

## 0.1.1 (2021-10-27)

### Bug Fixes

- added skeleton component ([cf9770c](https://github.com/equinor/fusion-react-components/commit/cf9770ccf9916944cd307c9571577b09e1b41fe4))
- fixed exports ([ed8707d](https://github.com/equinor/fusion-react-components/commit/ed8707db66c19f4e715a6978cd68581ab8af35e4))
