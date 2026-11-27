---
"@equinor/fusion-react-tabs": major
"@equinor/fusion-react-stepper": major
"@equinor/fusion-react-errorboundary": major
"@equinor/fusion-react-ag-grid-utils": major
"@equinor/fusion-react-filter": major
"@equinor/fusion-react-hanging-garden": major
---

Use EDS colour-scheme-aware CSS variables (`var(--eds-color-…)`, and `var(--eds-elevation-low)` for the hanging-garden popover shadow) instead of static colours from the `@equinor/eds-tokens` JavaScript `tokens` object or hard-coded values. Components now follow `data-color-scheme` (light/dark). Spacing and typography sizes still come from `tokens`. The hanging-garden canvas (PIXI) colours remain static.

**Breaking:** Hosts must load `@equinor/eds-tokens/css/variables` directly or through `ThemeProvider` from `@equinor/fusion-react-styles`. Without the stylesheet, the migrated styles no longer have fallback colours.

Ref: equinor/fusion-core-tasks#2755
