# EDS page layout zones lookup

## Page layout zones

Fusion Portal apps run inside the Fusion Portal shell, which owns the top navigation, left rail, and outer margins. Apps must **not** replicate or conflict with these zones.

### Three-zone app shell

| Zone | Component | Notes |
|---|---|---|
| Top bar / header | Provided by Fusion Portal shell | Apps do not render a global header |
| Main content area | `<main>` or top-level app `<div>` | Full available width and height |
| Side panel / detail | `@equinor/fusion-react-side-sheet` | Slides in from the right; do not use custom positioned overlays |

### Layout constraints

- **Do not** add outer `margin` or `padding` to the root app component — the portal shell provides the content inset.
- Use `--eds-spacing-horizontal-<size>` / `--eds-spacing-vertical-<size>` tokens for internal section spacing.
- **Do not** use fixed `height` on the root container — allow content to stretch to the available viewport height.
- **Do not** create custom scrollable containers that wrap the full page — the browser scroll is the standard scroll surface.
- Nested scrollable regions are acceptable for fixed-height grid/table areas, but must be deliberate and clearly bounded.

### Empty and loading states

| State | Pattern |
|---|---|
| Loading | EDS `Progress.Circular` (`import { Progress } from '@equinor/eds-core-react'`) centered in content area (`@equinor/fusion-react-progress-indicator` is deprecated; do not add it) |
| Empty (no data) | EDS `Typography` + optional EDS `Button` for a primary action; centered or top-aligned |
| Error | EDS `Typography variant="body_short"` colored with `--eds-color-text-danger-strong` + retry action |

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
