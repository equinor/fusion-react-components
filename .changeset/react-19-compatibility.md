---
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

React 19 compatibility fixes

- Fixed TypeScript errors related to React 19 type changes
- Updated `useRef` calls to provide initial values when type is explicitly specified
- Fixed `HTMLDivElement` type usage to use `Partial<HTMLAttributes<HTMLDivElement>>`
- Fixed `useFilterSelection` observable type handling for `Set<T>` return type
- Added proper type annotations for web components
- Updated component prop types to be compatible with React 19's stricter type checking

Reference https://github.com/equinor/fusion/issues/696

Devops: AB#65644

Thanks to @AndreasPrestHammer for reporting this issue!
