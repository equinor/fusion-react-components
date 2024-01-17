---
"@equinor/fusion-react-context-selector": patch
---

- In packages/context-selector/package.json:
  - Replaces dependency `@equinor/fusion-react-icon` with `@equinor/fusion-wc-icon`
  - Updates the dependency:
    - @equinor/fusion-wc-searchable-dropdown to version ^3.6.0
  - Removes a dependency:
    - @equinor/fusion-react-icon
  - Adds a peer dependency:
    - @types/react version ^18
    - react version ^18
  - Defines @types/react as an optional peer dependency
- In packages/context-selector/src/ContextSearch.tsx:
  - Updates the code to use fwc-icon instead of Icon component
