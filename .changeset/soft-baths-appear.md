---
"@equinor/fusion-react-ag-grid-person-cell": minor
---

Add automatic array handling for selector functions in PersonCellRender.

You can now use selectors like `(data: Person) => data.azureUniqueId` and the component will automatically map them over arrays, so you no longer need to manually map through arrays in your selector. This works for `azureId`, `upn`, and `dataSource` selectors.
