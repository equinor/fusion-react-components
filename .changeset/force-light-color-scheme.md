---
"@equinor/fusion-react-styles": patch
---

Force the EDS light colour scheme by setting `data-color-scheme="light"` on the `ThemeProvider`'s `fwc-theme` wrapper, so `prefers-color-scheme: dark` no longer loads dark EDS variables. Temporary until Fusion supports dark mode.

Ref: equinor/fusion-core-tasks#2120
