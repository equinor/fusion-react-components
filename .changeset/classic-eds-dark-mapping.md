---
"@equinor/fusion-react-styles": minor
---

Make stable EDS 2.x components follow dark mode. The root `ThemeProvider` maps the classic `--eds_*` colour properties that `@equinor/eds-core-react` 2.x reads to the scheme-aware `--eds-color-*` variables of `@equinor/eds-tokens` 2.3.2, under `[data-color-scheme="dark"]` (and the system dark preference on a root without `data-color-scheme="light"`) only, so light mode keeps the classic colours. The scrim uses a translucent mix of `--eds-color-bg-backdrop`. `Tooltip` and `Snackbar` get a dark, near-opaque `--eds-color-bg-neutral-canvas` background and light text.

New exports for hosts with their own global styles: `classicColourVariables`, `classicScrimColour`, `classicOverlayColour`, `classicOverlayColours`, `classicOverlayTextStyles`, `classicColourDeclarations()` and `classicColourSchemeStyles()`.
