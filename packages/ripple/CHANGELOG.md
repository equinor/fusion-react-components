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

## 0.4.5

### Patch Changes

- 63b7e92: Change to biome linting rules

## 0.4.4

### Patch Changes

- f989cb4: re-release, no changes

## 0.4.3

### Patch Changes

- 0d6c000: update wc-components to latest

## 0.4.2

### Patch Changes

- d07f10a: - Exported various components and types from different files.
  - Updated exports to use the `type` keyword for certain types.

## 0.4.1

### Patch Changes

- 4aeee2d4: build(deps): bump @equinor/fusion-wc-ripple from 0.2.21 to 1.1.0

## 0.4.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- Updated dependencies [60e68683]
  - @equinor/fusion-react-utils@2.1.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.3.9 (2023-09-18)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## 0.3.8 (2023-01-12)

### Bug Fixes

- **ripple:** exporting RippleHandlers ([6e38f03](https://github.com/equinor/fusion-react-components/commit/6e38f036f78d567cdac74190b639409e1c0cbef7))

## 0.3.7 (2022-11-21)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## [0.3.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ripple@0.3.5...@equinor/fusion-react-ripple@0.3.6) (2022-06-29)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## [0.3.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ripple@0.3.4...@equinor/fusion-react-ripple@0.3.5) (2022-06-15)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## 0.3.4 (2022-06-14)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## [0.3.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-ripple@0.3.2...@equinor/fusion-react-ripple@0.3.3) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## 0.3.2 (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-ripple

## 0.3.1 (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-ripple

# 0.3.0 (2022-02-11)

### Features

- **ripple:** added ripple react component ([9589a43](https://github.com/equinor/fusion-react-components/commit/9589a43be4c5d2ddc0467f3079d6f40f53aa95e6))
