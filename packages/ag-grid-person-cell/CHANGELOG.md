# Change Log

## 4.0.0

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
  - @equinor/fusion-react-person@1.0.0
  - @equinor/fusion-react-utils@3.0.0

## 3.2.1

### Patch Changes

- 83fb492: Remove ag-grid-community and use @equinor/fusion-framework-react-ag-grid instead

## 3.2.0

### Minor Changes

- 8b29782: **AG Grid Person Cell Component Updates**
  - Updated dependencies for both person cell and person component
  - **NEW**: Replaced tooltip functionality with popover-based person cards for better user experience
  - Added `PersonPopover` component that shows detailed person information on hover
  - Better visual alignment and spacing for both single person and array person cells
  - Legacy AgGrid tooltip integration
  - Array person cells now display in a more compact, aligned format with proper hover states

### Patch Changes

- Updated dependencies [8b29782]
  - @equinor/fusion-react-person@0.10.7

## 3.1.1

### Patch Changes

- 0f86802: Fix person cell rendering when there is no data available.

## 3.1.0

### Minor Changes

- 015c8b6: Add automatic array handling for selector functions in PersonCellRender.

  You can now use selectors like `(data: Person) => data.azureUniqueId` and the component will automatically map them over arrays, so you no longer need to manually map through arrays in your selector. This works for `azureId`, `upn`, and `dataSource` selectors.

## 3.0.0

### Major Changes

- c20b0b0: feat: Add support for array data in agGridPersonCell
  - The agGridPersonCell function now automatically detects when the field contains an array of person identifiers.
  - Tooltips are disabled for array fields and now it's using tooltip from EDS.
  - Heading and subHeading functions are not applied to array data.
  - A special CSS class `personnel-table-cell` is applied for array fields, while `person-table-cell` is used for single person fields.
  - Documentation updated to describe array handling in storybook.

### Patch Changes

- Updated dependencies [c20b0b0]
  - @equinor/fusion-react-person@0.10.6

## 2.0.5

### Patch Changes

- 63b7e92: Change to biome linting rules
- Updated dependencies [63b7e92]
  - @equinor/fusion-react-person@0.10.5
  - @equinor/fusion-react-utils@2.2.3

## 2.0.4

### Patch Changes

- Updated dependencies [dcaa3e6]
  - @equinor/fusion-react-person@0.10.4

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
