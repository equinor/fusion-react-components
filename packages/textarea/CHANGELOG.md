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

## 0.6.5

### Patch Changes

- 63b7e92: Change to biome linting rules

## 0.6.4

### Patch Changes

- f989cb4: re-release, no changes

## 0.6.3

### Patch Changes

- 0d6c000: update wc-components to latest

## 0.6.2

### Patch Changes

- 1e9192e: update fusion-wc-searchable-dropdown and fusion-wc-textarea deps

## 0.6.1

### Patch Changes

- 754204ef: build(deps): bump @equinor/fusion-wc-textarea from 0.4.22 to 1.1.0

## 0.6.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- Updated dependencies [60e68683]
  - @equinor/fusion-react-utils@2.1.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.5.16 (2023-09-18)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.15 (2022-11-21)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.5.14](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.13...@equinor/fusion-react-textarea@0.5.14) (2022-06-29)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.5.13](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.12...@equinor/fusion-react-textarea@0.5.13) (2022-06-15)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.5.12](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.11...@equinor/fusion-react-textarea@0.5.12) (2022-06-14)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.11 (2022-05-31)

### Bug Fixes

- **textarea:** add charCounter prop ([dbf76de](https://github.com/equinor/fusion-react-components/commit/dbf76dea811b1a5ddbc71b91d0ec17a0700e6e82))

## [0.5.10](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.9...@equinor/fusion-react-textarea@0.5.10) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.9 (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.8 (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.5.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.6...@equinor/fusion-react-textarea@0.5.7) (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.6 (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.5 (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.5.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.3...@equinor/fusion-react-textarea@0.5.4) (2021-11-02)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.5.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.5.2...@equinor/fusion-react-textarea@0.5.3) (2021-10-29)

### Bug Fixes

- updated packages ([4298c77](https://github.com/equinor/fusion-react-components/commit/4298c778c4c5385398a92d8b71feee3b17ba64c0))

## 0.5.2 (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.5.1 (2021-10-13)

**Note:** Version bump only for package @equinor/fusion-react-textarea

# [0.5.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.4.2...@equinor/fusion-react-textarea@0.5.0) (2021-10-05)

### Features

- **textarea:** create wrapper for element ([0353d0b](https://github.com/equinor/fusion-react-components/commit/0353d0bf7aef2647698f819dd927350c3bd25848))

## 0.4.2 (2021-09-30)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.4.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.4.0...@equinor/fusion-react-textarea@0.4.1) (2021-09-27)

### Bug Fixes

- update to lit create element method ([ec68c08](https://github.com/equinor/fusion-react-components/commit/ec68c08d5cbcba43a1b8ca064cccc73662f17421))

# [0.4.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.3.2...@equinor/fusion-react-textarea@0.4.0) (2021-09-23)

### Features

- **textarea:** expose validation ([99a8842](https://github.com/equinor/fusion-react-components/commit/99a88423d79829f7e499d3d8a3f5ec1be105adb3))

## 0.3.2 (2021-09-16)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.3.1 (2021-09-07)

**Note:** Version bump only for package @equinor/fusion-react-textarea

# 0.3.0 (2021-09-07)

### Bug Fixes

- fix exports and deps ([b614834](https://github.com/equinor/fusion-react-components/commit/b614834c32db4fbb9b06407e53557109128ec95b))

### Features

- update doc and include readme ([04b2544](https://github.com/equinor/fusion-react-components/commit/04b25443398507b35c3b88bf90a26d56c5b1c460))

## 0.2.5 (2021-08-16)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.2.4 (2021-08-16)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## [0.2.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-textarea@0.2.2...@equinor/fusion-react-textarea@0.2.3) (2021-08-05)

**Note:** Version bump only for package @equinor/fusion-react-textarea

## 0.2.2 (2021-08-03)

### Bug Fixes

- fixed typing, readme and updated packages ([fbaf25f](https://github.com/equinor/fusion-react-components/commit/fbaf25f7539d349c5f0fb3bd3a1a22b2b055b754))

## 0.2.1 (2021-07-20)

**Note:** Version bump only for package @equinor/fusion-react-textarea

# 0.2.0 (2021-07-07)

### Bug Fixes

- fixed readme ([4600f39](https://github.com/equinor/fusion-react-components/commit/4600f3918add9940729328c19396000b5da1e870))

### Features

- added text area component ([f245775](https://github.com/equinor/fusion-react-components/commit/f245775348b06a5a5095a719a5b8540411a94567))
