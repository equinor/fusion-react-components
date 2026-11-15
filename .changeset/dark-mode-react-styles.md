---
"@equinor/fusion-react-styles": minor
---

`ThemeProvider` no longer forces light mode: it removes the `data-color-scheme="light"` that `fwc-theme` sets when connected, so the subtree inherits the colour scheme from its ancestors.

Ref: equinor/fusion-core-tasks#2755
