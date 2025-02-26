# Change Log

## 2.0.3

### Patch Changes

- f989cb4: re-release, no changes
- Updated dependencies [f989cb4]
  - @equinor/fusion-react-person@0.10.3
  - @equinor/fusion-react-utils@2.2.2

## 2.0.2

### Patch Changes

- a1c95c3: fixed deps for ag-grid
- Updated dependencies [bdbd574]
- Updated dependencies [0d6c000]
  - @equinor/fusion-react-utils@2.2.1
  - @equinor/fusion-react-person@0.10.2

## 2.0.1

### Patch Changes

- 2606cc9: Update eds-core-react deps

## 2.0.0

### Major Changes

- 80f579c: **Major update:** AgGrid version 33, possible braking changes

  - Updated types and dependencies to newest AgGrid version
  - Now using and depended on _@equinor/fusion-framework-module-ag-grid_

## 1.0.7

### Patch Changes

- Updated dependencies [f461f22]
  - @equinor/fusion-react-person@0.10.1

## 1.0.6

### Patch Changes

- 0a37ed6: AgGrid person cell update of:

  - Storybook
  - Dependencies

  Person update deps

- Updated dependencies [b3c5d1a]
- Updated dependencies [b3c5d1a]
- Updated dependencies [0a37ed6]
  - @equinor/fusion-react-utils@2.2.0
  - @equinor/fusion-react-person@0.10.0

## 1.0.5

### Patch Changes

- Updated dependencies [51067ef]
  - @equinor/fusion-react-person@0.9.5

## 1.0.4

### Patch Changes

- Updated dependencies [b20f7ec]
  - @equinor/fusion-react-person@0.9.4

## 1.0.3

### Patch Changes

- Updated dependencies [6af9c2c]
  - @equinor/fusion-react-utils@2.1.2
  - @equinor/fusion-react-person@0.9.3

## 1.0.2

### Patch Changes

- 49389d4: AgGrid person cell update of:

  - Storybook
  - Dependencies

- Updated dependencies [49389d4]
  - @equinor/fusion-react-person@0.9.2

## 1.0.1

### Patch Changes

- Updated dependencies [f66e689]
  - @equinor/fusion-react-person@0.9.1

## 1.0.0

### Major Changes

- bb95029: ### New component: `agGridPersonCell`

  React component for displaying person details in AgGrid cell and PersonCard on cell hover.

  - Introduced `agGridPersonCell` for integrating person details into AgGrid cells.
  - Customizable `heading`, `subHeading`, `size`, and `showAvatar` options.
  - Allows mapping complex data structures for fields like `azureId`, `upn`, and `dataSource`.
  - Supports custom HTML for `heading` and `subHeading` to enable rich content in cells.
  - Added support for custom sorting logic with `dataToSort`. **_!Note_** Allows only usage of cell's data, not provider data.

### Patch Changes

- Updated dependencies [bb95029]
  - @equinor/fusion-react-person@0.9.0
