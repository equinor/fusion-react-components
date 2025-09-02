---
"@equinor/fusion-react-ag-grid-person-cell": major
"@equinor/fusion-react-components-stories": patch
---

feat: Add support for array data in agGridPersonCell

- The agGridPersonCell function now automatically detects when the field contains an array of person identifiers.
- Tooltips are disabled for array fields and now it's using tooltip from EDS.
- Heading and subHeading functions are not applied to array data.
- A special CSS class `personnel-table-cell` is applied for array fields, while `person-table-cell` is used for single person fields.
- Documentation updated to describe array handling in storybook.
