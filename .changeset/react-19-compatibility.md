---
"@equinor/fusion-react-ag-grid-person-cell": major
"@equinor/fusion-react-ag-grid-utils": major
"@equinor/fusion-react-context-selector": major
"@equinor/fusion-react-date": major
"@equinor/fusion-react-errorboundary": major
"@equinor/fusion-react-filter": major
"@equinor/fusion-react-hanging-garden": major
"@equinor/fusion-react-list": major
"@equinor/fusion-react-markdown": major
"@equinor/fusion-react-person": major
"@equinor/fusion-react-ripple": major
"@equinor/fusion-react-searchable-dropdown": major
"@equinor/fusion-react-side-sheet": major
"@equinor/fusion-react-skeleton": major
"@equinor/fusion-react-stepper": major
"@equinor/fusion-react-styles": major
"@equinor/fusion-react-tabs": major
"@equinor/fusion-react-textarea": major
"@equinor/fusion-react-utils": major
"@equinor/fusion-react-components-stories": major
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
