---
"@equinor/fusion-react-components": patch
"@equinor/fusion-react-ag-grid-person-cell": patch
"@equinor/fusion-react-ag-grid-utils": patch
"@equinor/fusion-react-context-selector": patch
"@equinor/fusion-react-date": patch
"@equinor/fusion-react-errorboundary": patch
"@equinor/fusion-react-filter": patch
"@equinor/fusion-react-hanging-garden": patch
"@equinor/fusion-react-list": patch
"@equinor/fusion-react-markdown": patch
"@equinor/fusion-react-person": patch
"@equinor/fusion-react-ripple": patch
"@equinor/fusion-react-searchable-dropdown": patch
"@equinor/fusion-react-side-sheet": patch
"@equinor/fusion-react-skeleton": patch
"@equinor/fusion-react-stepper": patch
"@equinor/fusion-react-styles": patch
"@equinor/fusion-react-tabs": patch
"@equinor/fusion-react-textarea": patch
"@equinor/fusion-react-utils": patch
---

Fix stale internal `workspace:*` dependency versions in published packages. The publish script now resolves
`workspace:*` to concrete versions from each sibling's on-disk `package.json` before packing, working around a Bun bug
(oven-sh/bun#18906) where `bun pm pack` used outdated versions from `bun.lock`.
