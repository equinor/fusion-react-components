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

## 0.10.10

### Patch Changes

- a9ee05e: Fixing issue with long names in PersonCard by updating fusion-wc-person

## 0.10.9

### Patch Changes

- 0f219e1: Updating fwc-person to implement fix in PersonCard

## 0.10.8

### Patch Changes

- a3cbec4: Updating wc-person in react-person to fix issue with long titles in PersonCard.

  Reported by @Apalhagen

  Closes https://github.com/equinor/fusion/issues/680

## 0.10.7

### Patch Changes

- 8b29782: **AG Grid Person Cell Component Updates**
  - Updated dependencies for both person cell and person component
  - **NEW**: Replaced tooltip functionality with popover-based person cards for better user experience
  - Added `PersonPopover` component that shows detailed person information on hover
  - Better visual alignment and spacing for both single person and array person cells
  - Legacy AgGrid tooltip integration
  - Array person cells now display in a more compact, aligned format with proper hover states

## 0.10.6

### Patch Changes

- c20b0b0: Update component to newer web component and add new property `showLetter` available from the updated component

## 0.10.5

### Patch Changes

- 63b7e92: Change to biome linting rules
- Updated dependencies [63b7e92]
  - @equinor/fusion-react-utils@2.2.3

## 0.10.4

### Patch Changes

- dcaa3e6: Update deps @equinor/fusion-wc-person to 3.1.7

## 0.10.3

### Patch Changes

- f989cb4: re-release, no changes
- Updated dependencies [f989cb4]
  - @equinor/fusion-react-utils@2.2.2

## 0.10.2

### Patch Changes

- 0d6c000: update wc-components to latest
- Updated dependencies [bdbd574]
  - @equinor/fusion-react-utils@2.2.1

## 0.10.1

### Patch Changes

- f461f22: Person component dependencies update

## 0.10.0

### Minor Changes

- b3c5d1a: cleanup in person components, removed unnecessary property mapping

### Patch Changes

- 0a37ed6: AgGrid person cell update of:
  - Storybook
  - Dependencies

  Person update deps

- Updated dependencies [b3c5d1a]
  - @equinor/fusion-react-utils@2.2.0

## 0.9.5

### Patch Changes

- 51067ef: Updating fusion-wc-person to 3.0.6

## 0.9.4

### Patch Changes

- b20f7ec: Updating fusion-wc-person to 3.0.5

## 0.9.3

### Patch Changes

- Updated dependencies [6af9c2c]
  - @equinor/fusion-react-utils@2.1.2

## 0.9.2

### Patch Changes

- 49389d4: AgGrid person cell update of:
  - Storybook
  - Dependencies

## 0.9.1

### Patch Changes

- f66e689: - Update fwc-person to v3.0.1
  - Ads example in storybook for using person-select as controlled component

## 0.9.0

### Minor Changes

- bb95029: New Person cell component. Available for displaying specified data in any table cell.

## 0.8.8

### Patch Changes

- e63b6a5: Update @equinor/fusion-wc-person to 2.6.9

## 0.8.7

### Patch Changes

- c1b0c41: Updating wc-person to resolve style issue with initial avatar

## 0.8.6

### Patch Changes

- 9b060db: Return type of PersonProvider and PersonSelect, Person story cleanup of user data.

## 0.8.5

### Patch Changes

- cb48ef2: Update person component dependencies

## 0.8.4

### Patch Changes

- 3931c44: Updates fusion-wc-person to get latest fixes for running multiple tasks

## 0.8.3

### Patch Changes

- 498d0a9: Updates PersonSelect's web component to allow searching with azureId on `selectedPerson` property

## 0.8.2

### Patch Changes

- d07f10a: - Exported various components and types from different files.
  - Updated exports to use the `type` keyword for certain types.

## 0.8.1

### Patch Changes

- 3c7521e: Updates fusion-wc-person

## 0.8.0

### Minor Changes

- 947df08: - bump @equinor/fusion-wc-person from 2.4.0 to 2.5.1
  - Add attribute `selectedPerson` to PersonSelect from @equinor/fusion-wc-person

## 0.7.0

### Minor Changes

- 1445e4e: bump @equinor/fusion-wc-person from 2.3.2 to 2.4.0

## 0.6.6

### Patch Changes

- 97ff612: PersonSelectEvent details show now as null when no-one is selected.

## 0.6.5

### Patch Changes

- 13c0ca4: deprecated `@equinor/fusion-react-button`

## 0.6.4

### Patch Changes

- c6f9fb71: Fixing props not working on person-select component

## 0.6.3

### Patch Changes

- 0baac88f: Updating webcomponent dependency @equinor/fusion-wc-person

## 0.6.2

### Patch Changes

- bcb9b7ad: chore: Dependencies update for person component

## 0.6.1

### Patch Changes

- f3e50576: expose `trigger` attribute from avatar
- 0d907751: adding missing event PersonSelectEvent from webcomponent

## 0.6.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- Updated dependencies [60e68683]
- Updated dependencies [60e68683]
  - @equinor/fusion-react-button@0.9.0
  - @equinor/fusion-react-utils@2.1.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.5.1 (2023-10-03)

**Note:** Version bump only for package @equinor/fusion-react-person

# 0.5.0 (2023-09-28)

### Bug Fixes

- **person-components:** export ([cdd2087](https://github.com/equinor/fusion-react-components/commit/cdd2087f7888a84ac01095a1aef184fa920f5e3a))
- **person-components:** lint ([8a29a77](https://github.com/equinor/fusion-react-components/commit/8a29a77e17cecbe45fdea11ccbac0a656c88e038))
- **person-components:** lint fix ([8ee218e](https://github.com/equinor/fusion-react-components/commit/8ee218e0c9a49e098481d54c0be4b7049d1503a0))
- **person-components:** provider update ([8b4cd0d](https://github.com/equinor/fusion-react-components/commit/8b4cd0d3bdb3dd1beb68e76baa6088985bb4715b))
- **person-components:** readme ([4e5e9fa](https://github.com/equinor/fusion-react-components/commit/4e5e9fae2bb2c23a8c2a6d3e51cead68f08a4b88))
- **person-provider:** rename ([2700ce2](https://github.com/equinor/fusion-react-components/commit/2700ce2cbe177720e1aed917f879a9d9f8b99aab))

### Features

- **person-components:** components update ([8cbe0b6](https://github.com/equinor/fusion-react-components/commit/8cbe0b6320911a901f44fd1d432019c3d236a9e1))
- **person-components:** person select ([fe23ae7](https://github.com/equinor/fusion-react-components/commit/fe23ae7b626d5b7e50e13e1e7f5a45cdbb8c2808))

## [0.4.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.4.1...@equinor/fusion-react-person@0.4.2) (2023-09-18)

### Bug Fixes

- **react-components:** lint errors ([28031ec](https://github.com/equinor/fusion-react-components/commit/28031ecf22b3e405a8a3c797b7e6351bd8547f9d))
- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## [0.4.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.4.0...@equinor/fusion-react-person@0.4.1) (2023-09-07)

### Bug Fixes

- **person-components:** namespace fix ([5b5cddf](https://github.com/equinor/fusion-react-components/commit/5b5cddfe15dacc8a662961caa107009cf0490287))

# [0.4.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.3.0...@equinor/fusion-react-person@0.4.0) (2023-09-07)

### Features

- **person-component:** person card and person list item upgrade ([c139cc4](https://github.com/equinor/fusion-react-components/commit/c139cc471689362d890534d1ba8fc1f00b948f4c))

# 0.3.0 (2023-09-07)

### Bug Fixes

- **person-avatar:** resolver name ([8635bf4](https://github.com/equinor/fusion-react-components/commit/8635bf49dec181d0b330970d442cf2cdd475c03d))

### Features

- **person-avatar:** person avatar component rework ([126f02d](https://github.com/equinor/fusion-react-components/commit/126f02dc91c12a289ca772be13e256fe4a117d3f))
- **person-avatar:** update show card on hover ([9405757](https://github.com/equinor/fusion-react-components/commit/9405757a0228bad48dea62ccc4ba27e6f6af377e))

## [0.2.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.2.8...@equinor/fusion-react-person@0.2.9) (2023-08-15)

### Bug Fixes

- **person:** popover import ([195d41a](https://github.com/equinor/fusion-react-components/commit/195d41ab69a1c35a1bec215f32e0d686e63fb8bd))

## [0.2.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.2.7...@equinor/fusion-react-person@0.2.8) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-person

## [0.2.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.2.6...@equinor/fusion-react-person@0.2.7) (2023-08-15)

### Bug Fixes

- **person:** popover import ([bc8a3d7](https://github.com/equinor/fusion-react-components/commit/bc8a3d7b399e03440e239a17a6c2f586e7c4dbd1))

## [0.2.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.2.5...@equinor/fusion-react-person@0.2.6) (2023-08-14)

### Bug Fixes

- **person:** force release ([864b41f](https://github.com/equinor/fusion-react-components/commit/864b41f543c976d8191a5d0faa79f5460b20a3eb))

## 0.2.5 (2023-08-11)

### Bug Fixes

- **person:** package update adjustments ([5b41d2f](https://github.com/equinor/fusion-react-components/commit/5b41d2fed5d24c1bcf6d05f0723635de5b9c9d19))

## 0.2.4 (2023-07-13)

**Note:** Version bump only for package @equinor/fusion-react-person

## 0.2.3 (2023-07-12)

**Note:** Version bump only for package @equinor/fusion-react-person

## 0.2.2 (2023-06-16)

**Note:** Version bump only for package @equinor/fusion-react-person

## [0.2.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-person@0.2.0...@equinor/fusion-react-person@0.2.1) (2023-03-28)

### Bug Fixes

- **react-components:** lint fix ([acff5ae](https://github.com/equinor/fusion-react-components/commit/acff5aeedcff65238dca18197d32ee3b10c87fde))
- **react-components:** lint fix ([750ee07](https://github.com/equinor/fusion-react-components/commit/750ee07ffe87c40afe0a170e387eb4ae0f903bd5))

# 0.2.0 (2023-03-24)

### Bug Fixes

- **person-card:** person item size ([f1bc43d](https://github.com/equinor/fusion-react-components/commit/f1bc43daa05ed56ceca7d063b5cc3118ed8d61bc))
- **person-list-item:** package update ([15f1619](https://github.com/equinor/fusion-react-components/commit/15f1619b2be38e5e48655d3f002f0fad382cd1d7))

### Features

- **person:** person list item ([47482b8](https://github.com/equinor/fusion-react-components/commit/47482b819f15d92e43ca6a0160ae5682cfdacedb))

## 0.1.3 (2023-02-14)

### Bug Fixes

- exporting types as type in packages ([f298ce9](https://github.com/equinor/fusion-react-components/commit/f298ce9907894d603e9a401f2b7db6b4cad7814b))

## 0.1.2 (2023-02-06)

### Bug Fixes

- :bug: additional type export ([b4c6e05](https://github.com/equinor/fusion-react-components/commit/b4c6e057885cef56029dc5537eaa96552637e064))
- :bug: type export ([4699ec9](https://github.com/equinor/fusion-react-components/commit/4699ec99a0665c4d64fee3a84944d39cd84896f1))

## 0.1.1 (2022-11-08)

### Bug Fixes

- **person:** import latest person version from web components ([d769de6](https://github.com/equinor/fusion-react-components/commit/d769de6ab8cbe4c18449cc11031a3e8d79a154ce))

# 0.1.0 (2022-11-04)

### Bug Fixes

- **person-card:** component story content ([37e0aa8](https://github.com/equinor/fusion-react-components/commit/37e0aa83cbfb0481684f0979ebb69286731a1ac1))
- **person-card:** verson down ([33aa840](https://github.com/equinor/fusion-react-components/commit/33aa84004e5f47d3f0c48181ad4e75bf7149feba))

### Features

- create wrapper for person card ([6df4b41](https://github.com/equinor/fusion-react-components/commit/6df4b415ba52f32234b1674f3b72805d56f6ffb6))
- **person-card:** storybook ([6f6f348](https://github.com/equinor/fusion-react-components/commit/6f6f3488cc5454cee204561bf08341c72332f1d4))
