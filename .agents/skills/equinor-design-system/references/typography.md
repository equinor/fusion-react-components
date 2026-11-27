# EDS typography lookup

## Typography

Use `Typography` from `@equinor/eds-core-react` for all text rendering. Never set raw `font-size`, `font-family`, or `line-height` manually — use the EDS `variant` prop.

### Variant hierarchy

| Level | `variant` | Usage |
|---|---|---|
| Display | `h1` | Hero headings (rarely used in apps) |
| Page title | `h2` | Top-level page heading |
| Section heading | `h3` | Section title, card header |
| Sub-heading | `h4` | Sub-section, panel title |
| Overline | `overline` | Category labels, breadcrumb-level text |
| Body | `body_long` | Multi-line body text |
| Body short | `body_short` | Single-line body, table cells |
| Caption | `caption` | Metadata, timestamps, helper text |
| Label | `label` | Form field labels |

```typescript
import { Typography } from '@equinor/eds-core-react';

// Correct
<Typography variant="h3">Section heading</Typography>
<Typography variant="body_short">Table cell value</Typography>
<Typography variant="caption">Last updated 2 hours ago</Typography>

// Wrong — never do this
<p style={{ fontSize: '14px' }}>…</p>
```

### Brand constraint

Equinor brand typeface is **Equinor** (used in marketing). Fusion apps must use the EDS system typeface defined by `@equinor/eds-core-react` — do not import or override the Equinor brand font in app CSS.

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
