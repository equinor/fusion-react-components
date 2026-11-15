---
"@equinor/fusion-react-styles": minor
---

Add an optional `colorScheme` prop (`'light' | 'dark' | 'system'`) to `ThemeProvider` and export the `ColorScheme` type. Without the prop, the provider no longer forces light mode and the subtree inherits `data-color-scheme` from its ancestors (for example `<html>`). With `system`, the provider follows `prefers-color-scheme` and updates when it changes.

Ref: equinor/fusion-core-tasks#2755
