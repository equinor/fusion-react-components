---
"@equinor/fusion-react-side-sheet": minor
---

Use EDS colour-scheme-aware CSS variables instead of static `tokens` colours, so the side sheet follows `data-color-scheme` (light/dark). The host must load the EDS colour variables.

The `Indicator` now also accepts a CSS variable (`var(--…)`) as `color`, through the new exported `IndicatorColor` and `CSSVariableString` types, and defaults to `var(--eds-color-bg-danger-fill-emphasis-default)`.

Ref: equinor/fusion-core-tasks#2755
