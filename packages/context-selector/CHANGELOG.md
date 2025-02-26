# Change Log

## 1.0.3

### Patch Changes

- f989cb4: re-release, no changes
- Updated dependencies [f989cb4]
  - @equinor/fusion-react-searchable-dropdown@1.0.3
  - @equinor/fusion-react-styles@0.6.4
  - @equinor/fusion-react-utils@2.2.2

## 1.0.2

### Patch Changes

- 0d6c000: update wc-components to latest
- Updated dependencies [bdbd574]
- Updated dependencies [0d6c000]
  - @equinor/fusion-react-utils@2.2.1
  - @equinor/fusion-react-searchable-dropdown@1.0.2
  - @equinor/fusion-react-styles@0.6.3

## 1.0.1

### Patch Changes

- 1e9192e: update fusion-wc-searchable-dropdown and fusion-wc-textarea deps
- Updated dependencies [1e9192e]
  - @equinor/fusion-react-searchable-dropdown@1.0.1

## 1.0.0

### Major Changes

- e277474: Implementing fixes from searchable-dropdown web component release [44aa0a8](https://github.com/equinor/fusion-web-components/commit/44aa0a8b744e873e19ee6fa9e92da0bd8c3031d8)

  This fixes multiple selections in searchable-dropdown and adding support for using html as meta icons in the result set.

  also fixes using attribute `selectedId` as preselected id, works best with initialItems from resolver.

  Updating to major version to make sure nothing in production brakes.

### Patch Changes

- Updated dependencies [e277474]
  - @equinor/fusion-react-searchable-dropdown@1.0.0

## 0.6.8

### Patch Changes

- Updated dependencies [b3c5d1a]
  - @equinor/fusion-react-utils@2.2.0

## 0.6.7

### Patch Changes

- Updated dependencies [6af9c2c]
  - @equinor/fusion-react-utils@2.1.2

## 0.6.6

### Patch Changes

- 8516c49: Adds event `ctx-selector-clear` to be able to clear the context-selectors state from outside the component.

## 0.6.5

### Patch Changes

- Updated dependencies [1d3cff3]
  - @equinor/fusion-react-styles@0.6.2

## 0.6.4

### Patch Changes

- 944be6b: Removes react as peer dependencie

## 0.6.3

### Patch Changes

- f0edb6e: Update of searchable dropdown web component in context selector

## 0.6.2

### Patch Changes

- Updated dependencies [498d186]
  - @equinor/fusion-react-searchable-dropdown@0.5.2

## 0.6.1

### Patch Changes

- d07f10a: - Exported various components and types from different files.
  - Updated exports to use the `type` keyword for certain types.
- Updated dependencies [d07f10a]
  - @equinor/fusion-react-searchable-dropdown@0.5.1

## 0.6.0

### Minor Changes

- 388302a: bump @equinor/fusion-wc-searchable-dropdown to 3.7.0 + update storybook

### Patch Changes

- 5e10a53: removed `@equinor/fusion-react-icon`
- Updated dependencies [388302a]
  - @equinor/fusion-react-searchable-dropdown@0.5.0

## 0.5.5

### Patch Changes

- 2a0cbfd: - In packages/context-selector/package.json:
  - Replaces dependency `@equinor/fusion-react-icon` with `@equinor/fusion-wc-icon`
  - Updates the dependency:
    - @equinor/fusion-wc-searchable-dropdown to version ^3.6.0
  - Removes a dependency:
    - @equinor/fusion-react-icon
  - Adds a peer dependency:
    - @types/react version ^18
    - react version ^18
  - Defines @types/react as an optional peer dependency
  - In packages/context-selector/src/ContextSearch.tsx:
    - Updates the code to use fwc-icon instead of Icon component

## 0.5.4

### Patch Changes

- Updated dependencies [fbf66eb]
  - @equinor/fusion-react-utils@2.1.1

## 0.5.3

### Patch Changes

- 56dd4331: Dropdown is hidden when navigating to context by url
- 56dd4331: Fixing hiden dropdownlist on ContextSearch

## 0.5.2

### Patch Changes

- 54941b4a: Dropdown is hidden when navigating to context by url

## 0.5.1

### Patch Changes

- ee674c9f: Updating fwc-searchable-dropdown dependency in context-selector and searchabledropdown

## 0.5.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- 60e68683: fixed missing dependencies
- Updated dependencies [60e68683]
  - @equinor/fusion-react-searchable-dropdown@0.4.0
  - @equinor/fusion-react-styles@0.6.0
  - @equinor/fusion-react-utils@2.1.0
  - @equinor/fusion-react-icon@0.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.11](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.4.10...@equinor/fusion-react-context-selector@0.4.11) (2023-10-03)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## 0.4.10 (2023-09-29)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## 0.4.9 (2023-09-21)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## 0.4.8 (2023-09-18)

### Bug Fixes

- **react-components:** lint errors ([28031ec](https://github.com/equinor/fusion-react-components/commit/28031ecf22b3e405a8a3c797b7e6351bd8547f9d))
- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## [0.4.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.4.6...@equinor/fusion-react-context-selector@0.4.7) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## 0.4.6 (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## 0.4.5 (2023-07-13)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## 0.4.4 (2023-06-16)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## [0.4.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.4.2...@equinor/fusion-react-context-selector@0.4.3) (2023-03-28)

### Bug Fixes

- **react-components:** lint fix ([804431d](https://github.com/equinor/fusion-react-components/commit/804431d8451cb66546a82a4a5f7458df8509b078))

## [0.4.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.4.1...@equinor/fusion-react-context-selector@0.4.2) (2023-03-08)

### Bug Fixes

- **ContextSearch:** setting focus on input when clicking wrapper ([8dcbf63](https://github.com/equinor/fusion-react-components/commit/8dcbf636a24f81d10c087ffb550c9aa46a1ab0b6))

## [0.4.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.4.0...@equinor/fusion-react-context-selector@0.4.1) (2023-02-24)

### Bug Fixes

- **context-selector:** type on provider ref ([eddeb34](https://github.com/equinor/fusion-react-components/commit/eddeb341ba1c8da237a0370d4fa7a34b53713ffc))

# [0.4.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.3.2...@equinor/fusion-react-context-selector@0.4.0) (2023-02-14)

### Bug Fixes

- **ContextSearch:** updating when property previewItem changes ([ecb4ae4](https://github.com/equinor/fusion-react-components/commit/ecb4ae407f68c66e0b0fc14424d78fce3f13a497))

### Features

- **ContextSearch:** show initialItem as selected ([9a09393](https://github.com/equinor/fusion-react-components/commit/9a09393430f5ba717f308930d61cde6aa24eb527))

## [0.3.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.3.1...@equinor/fusion-react-context-selector@0.3.2) (2023-02-10)

### Bug Fixes

- **ContextSearch:** remembers current context and minor ux fixes ([8afac6a](https://github.com/equinor/fusion-react-components/commit/8afac6ab9ace8f2367a7a16d71a5b24bd69de998))

## 0.3.1 (2023-02-07)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

# 0.3.0 (2023-01-19)

### Bug Fixes

- changin ContextSelectorHeader to not include provider ([611ba3d](https://github.com/equinor/fusion-react-components/commit/611ba3d3f8cadd9d59b057229c8667a9fff83240))
- **contextHeader:** styling for preview ([01b9679](https://github.com/equinor/fusion-react-components/commit/01b96797ad66d4b4baf074f4235d91b1265d3e4a))
- **ContextSearch:** export ContextSearch from index ([f40e5e3](https://github.com/equinor/fusion-react-components/commit/f40e5e31e124551d621d0599b1cda6de6abda791))
- **contextSelectorHeader:** event logic and no rude console logs ([f3874d7](https://github.com/equinor/fusion-react-components/commit/f3874d748767926beb15737d018e162ac3fcf83f))
- **contextSelectorHeader:** importing icon component ([f316e7d](https://github.com/equinor/fusion-react-components/commit/f316e7d47df6ce688b1ebdb645c243414e93a1c2))
- **contextSelector:** made onClearContext optional for ContextSelectorHeader ([2bdfc7b](https://github.com/equinor/fusion-react-components/commit/2bdfc7bb21d6dc895a25ce91ad15c8cd2aa22b59))

### Features

- **ContextSearch:** closing contextselector on close ([52a6639](https://github.com/equinor/fusion-react-components/commit/52a663982463e10b04dec56bc89ffdf7dd214652))
- **contextSelector:** component for ContextSelectorHeader ([985dc50](https://github.com/equinor/fusion-react-components/commit/985dc5018f4caa53d05a4dc14f5717b335b8f9d6))

# [0.2.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.8...@equinor/fusion-react-context-selector@0.2.0) (2022-12-13)

### chore

- **contextselector:** readme ([8e98782](https://github.com/equinor/fusion-react-components/commit/8e987825a9890013e0d1b482b7b0ff82cdc2b182))

### Features

- **contextselector:** better typing for context selector ([941863a](https://github.com/equinor/fusion-react-components/commit/941863ad6259439e90dcd341ff406e782ce3121d))
- **contextselector:** splitting comp to provider an element ([ef5eeca](https://github.com/equinor/fusion-react-components/commit/ef5eeca2dc5fb76c670e1d1fd089c56d36466e82))

### BREAKING CHANGES

- **contextselector:** components is now split in 2 parts, provider and selector

## [0.1.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.7...@equinor/fusion-react-context-selector@0.1.8) (2022-12-02)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## [0.1.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.6...@equinor/fusion-react-context-selector@0.1.7) (2022-11-29)

### Bug Fixes

- **context-selector:** typehinting for select event ([ecf08a7](https://github.com/equinor/fusion-react-components/commit/ecf08a7f4969b3a9047d857f09e44a9acdcb7e06))

## [0.1.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.5...@equinor/fusion-react-context-selector@0.1.6) (2022-11-25)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## [0.1.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.4...@equinor/fusion-react-context-selector@0.1.5) (2022-11-25)

### Bug Fixes

- **contextselector:** exporting types properly ([6b839fe](https://github.com/equinor/fusion-react-components/commit/6b839fe1070145c41a1e52f3bfd97c11f8a0d344))

## 0.1.4 (2022-11-25)

### Bug Fixes

- updated contextselector and sdd to match webcomponent and storybook ([24ae5f4](https://github.com/equinor/fusion-react-components/commit/24ae5f4e7ff6468f9a046a9e3d5ea955a2258c1d))

## [0.1.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.2...@equinor/fusion-react-context-selector@0.1.3) (2022-11-21)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## [0.1.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.1...@equinor/fusion-react-context-selector@0.1.2) (2022-11-14)

**Note:** Version bump only for package @equinor/fusion-react-context-selector

## [0.1.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-context-selector@0.1.0...@equinor/fusion-react-context-selector@0.1.1) (2022-11-09)

### Bug Fixes

- updating webcomponent renaming contextsel type ([5c7bf8d](https://github.com/equinor/fusion-react-components/commit/5c7bf8d19535b4448f5cfc57c8317bc3715699df))

# 0.1.0 (2022-11-09)

### Bug Fixes

- **context-selector:** exporting types and using parts from dropdown ([45add70](https://github.com/equinor/fusion-react-components/commit/45add70b6f35e42c625b004de171b08b0eb3bbbc))

### Features

- **context-selector:** extending component from web-components ([b03b3ee](https://github.com/equinor/fusion-react-components/commit/b03b3eebacf337840c76f5b10718ae263f551afe))
