# Change Log

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
