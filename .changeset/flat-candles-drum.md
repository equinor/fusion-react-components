---
'@equinor/fusion-react-searchable-dropdown': major
'@equinor/fusion-react-context-selector': major
'@equinor/fusion-react-components-stories': patch
---

Implementing fixes from searchable-dropdown web component release [44aa0a8](https://github.com/equinor/fusion-web-components/commit/44aa0a8b744e873e19ee6fa9e92da0bd8c3031d8)

This fixes multiple selections in searchable-dropdown and adding support for using html as meta icons in the result set.

also fixes using attribute `selectedId` as preselected id, works best with initialItems from resolver.

Updating to major version to make sure nothing in production brakes.
