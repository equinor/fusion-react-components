---
"@equinor/fusion-react-styles": major
"@equinor/fusion-react-person": major
"@equinor/fusion-react-markdown": major
"@equinor/fusion-react-skeleton": major
"@equinor/fusion-react-layout": major
"@equinor/fusion-react-context-selector": major
"@equinor/fusion-react-searchable-dropdown": major
"@equinor/fusion-react-textarea": major
"@equinor/fusion-react-list": major
"@equinor/fusion-react-filter": major
---

Depend on the colour-scheme-aware major versions of the Fusion web components, so they follow light and dark mode.

- `@equinor/fusion-wc-theme` 2: `<fwc-theme>` no longer forces light mode and follows the document `data-color-scheme`.
- `@equinor/fusion-wc-avatar` 4, `-chip` 2, `-list` 2, `-markdown` 2, `-page` 1, `-people` 3, `-person` 4, `-searchable-dropdown` 5, `-skeleton` 3 and `-textarea` 2 use EDS CSS colour variables without fallbacks.

**Breaking:** the web components no longer carry fallback colours, so the host must load the `@equinor/eds-tokens` 2.x CSS variables (`@equinor/eds-tokens/css/variables`). `ThemeProvider` from `@equinor/fusion-react-styles` does this. Without it, the components render without colours. `ThemeProvider` and `<fwc-theme>` also stop forcing light mode and follow the document colour scheme; set `data-color-scheme="light"` on `<html>`, or `colorScheme="light"` on `ThemeProvider`, to keep the previous look.

Ref: equinor/fusion-core-tasks#2755
