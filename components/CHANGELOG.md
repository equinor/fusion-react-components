# @equinor/fusion-react-components

## 1.1.1

### Patch Changes

- 3197bf7: Fix stale internal `workspace:*` dependency versions in published packages.

  Previously published tarballs pinned outdated versions of sibling workspace
  packages (for example, `@equinor/fusion-react-person` resolving to an old
  `@equinor/fusion-react-utils`, and `@equinor/fusion-react-components` resolving
  to an old `@equinor/fusion-react-person`). This happened because `bun pm pack`
  substitutes `workspace:*` ranges using the versions recorded in `bun.lock`, but
  the lockfile was not refreshed after `changeset version` bumped package
  versions, so the lockfile drifted out of sync with the actual package versions.

  This release republishes all packages so their `workspace:*` dependencies are
  resolved to the correct, current versions. The release workflow now refreshes
  and commits `bun.lock` during the version step (`changeset version && bun
install`), preventing this drift from recurring.

- Updated dependencies [3197bf7]
  - @equinor/fusion-react-person@2.0.12

## 1.1.0

### Minor Changes

- 2e87d5f: Add comprehensive documentation and improved module exports to the main components package.

  - New README with installation, usage examples, and benefits documentation
  - New exports field enabling modular subpath imports (e.g., `@equinor/fusion-react-components/person`)

### Patch Changes

- Updated dependencies [2e87d5f]
  - @equinor/fusion-react-person@2.0.11

## 1.0.10

### Patch Changes

- @equinor/fusion-react-person@2.0.10

## 1.0.9

### Patch Changes

- Updated dependencies [fb79375]
  - @equinor/fusion-react-person@2.0.9

## 1.0.8

### Patch Changes

- Updated dependencies [89ceb65]
  - @equinor/fusion-react-person@2.0.8

## 1.0.7

### Patch Changes

- Updated dependencies [44e749a]
  - @equinor/fusion-react-person@2.0.7

## 1.0.6

### Patch Changes

- Updated dependencies [e7c525a]
- Updated dependencies [2518da0]
  - @equinor/fusion-react-person@2.0.6

## 1.0.5

### Patch Changes

- Updated dependencies [5906962]
  - @equinor/fusion-react-person@2.0.5

## 1.0.4

### Patch Changes

- 445bd76: Remove sourcemap generation from build output. Published packages no longer ship broken `.js.map` files that referenced missing source files, eliminating console warnings for consumers.
- Updated dependencies [445bd76]
- Updated dependencies [445bd76]
  - @equinor/fusion-react-person@2.0.4

## 1.0.3

### Patch Changes

- e942e21: Remove the "ignoreDeprecations" tsconfig property and fix build errors
- Updated dependencies [e942e21]
  - @equinor/fusion-react-person@2.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [c0fe19f]
  - @equinor/fusion-react-person@2.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [7968ea2]
  - @equinor/fusion-react-person@2.0.1

## 1.0.0

### Major Changes

- f3e9518: - Introduces a new component library, @equinor/fusion-react-components, a collection of other fusion react components in one installable package.

### Patch Changes

- Updated dependencies [f3e9518]
  - @equinor/fusion-react-person@2.0.0
