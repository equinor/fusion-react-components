---
"@equinor/fusion-react-side-sheet": major
---

Use EDS colour-scheme-aware CSS variables instead of static `tokens` colours, so the side sheet follows `data-color-scheme` (light/dark).

**Breaking:** Hosts must load `@equinor/eds-tokens/css/variables` directly or through `ThemeProvider` from `@equinor/fusion-react-styles`. Without the stylesheet, the sheet background and default indicator no longer have fallback colours.

The `Indicator` now also accepts a CSS variable (`var(--…)`) as `color`, through the new exported `IndicatorColor` and `CSSVariableString` types, and defaults to `var(--eds-color-bg-danger-fill-emphasis-default)`.

Ref: equinor/fusion-core-tasks#2755
