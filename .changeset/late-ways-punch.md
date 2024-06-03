---
'@equinor/fusion-react-ag-grid-styles': patch
---

- **IMPORTANT:** root is no longer needed and inline-edit-mode has been removed
- Cleanup AgGrid style with adding `alpine-active-color` and background colors to main style theme
- In order to fix not beeing able to click on checkbox in AgGrid, removed `indicateEditMode` from **useStyle**
