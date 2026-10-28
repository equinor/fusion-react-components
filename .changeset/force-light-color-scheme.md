---
"@equinor/fusion-react-styles": patch
---

Force the EDS light colour scheme from the root `ThemeProvider` until Fusion supports dark mode.

- The outermost `ThemeProvider` sets `data-color-scheme="light"` on `<html>`, so `prefers-color-scheme: dark` no longer loads dark EDS variables (including in portals/overlays). The previous value is restored when the last root provider unmounts.
- `EdsTokens` adds `:root { color-scheme: only light; }` to keep native controls light.

Ref: equinor/fusion-core-tasks#2120
