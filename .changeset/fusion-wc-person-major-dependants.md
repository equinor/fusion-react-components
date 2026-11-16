---
"@equinor/fusion-react-ag-grid-person-cell": major
"@equinor/fusion-react-components": major
---

Follow `@equinor/fusion-react-person` 3 onto `@equinor/fusion-wc-person` 4, so the person cell and the re-exported person components use the colour-scheme-aware person elements. Both resolve the same `fusion-wc-person` copy as `@equinor/fusion-react-person`, so the custom elements are registered once.

**Breaking:** `@equinor/fusion-wc-person` 4 has no fallback colours, so the host must load the `@equinor/eds-tokens` 2.x CSS variables (`@equinor/eds-tokens/css/variables`), for example through `ThemeProvider` from `@equinor/fusion-react-styles`.

Ref: equinor/fusion-core-tasks#2755
