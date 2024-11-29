---
'@equinor/fusion-react-ag-grid-styles': patch
'@equinor/fusion-react-components-stories': patch
---

### Package `@equinor/fusion-react-ag-grid-styles`

Changed export statement

- `export { useStyles, useStyles as default } from './agGridStyles';`
- Renamed `useAgGridStyles.ts` to `index.ts` in `ag-grid-styles` package.

### Storybook

Updated import paths and usage of `useAgGridStyles` to `useStyles` in `storybook` stories.
