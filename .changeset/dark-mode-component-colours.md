---
"@equinor/fusion-react-tabs": patch
"@equinor/fusion-react-stepper": patch
"@equinor/fusion-react-errorboundary": patch
"@equinor/fusion-react-ag-grid-utils": patch
"@equinor/fusion-react-filter": patch
"@equinor/fusion-react-hanging-garden": patch
---

Use EDS colour-scheme-aware CSS variables (`var(--eds-color-…)`, and `var(--eds-elevation-low)` for the hanging-garden popover shadow) instead of static colours from the `@equinor/eds-tokens` JavaScript `tokens` object or hard-coded values. No literal colour fallbacks are kept, so the host must load the EDS colour variables. Components now follow `data-color-scheme` (light/dark). Spacing and typography sizes still come from `tokens`. The hanging-garden canvas (PIXI) colours remain static.

Ref: equinor/fusion-core-tasks#2755
