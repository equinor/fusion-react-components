# EDS spacing tokens lookup

## Spacing tokens

Use `--eds-spacing-horizontal-<size>` and `--eds-spacing-vertical-<size>` from `@equinor/eds-tokens` v2 for margin, padding, and gap. Do not use arbitrary pixel values.

The horizontal and vertical scales share the same size steps but may differ by a few pixels at each step; use the axis-appropriate token (horizontal for left/right, vertical for top/bottom).

| Size | Horizontal value | Vertical value | Use for |
|---|---|---|---|
| `4xs` | 2 px | 2 px | Micro gap, tight icon padding |
| `3xs` | 4 px | 4 px | XS gap |
| `2xs` | 6 px | 6 px | Small inset padding |
| `xs` | 8 px | 8 px | SM gap, compact list spacing |
| `sm` | 12 px | 12 px | Inner padding (chips, badges) |
| `md` | 16 px | 16 px | Standard content padding |
| `lg` | 20 px | 20 px | LG gap, section spacing |
| `xl` | 24 px | 24 px | XL gap, card separation |
| `2xl` | 28 px | 28 px | Major section break |
| `3xl` | 32 px | 32 px | Section-level whitespace |

```typescript
const Section = styled.section`
  padding-inline: var(--eds-spacing-horizontal-md);
  padding-block: var(--eds-spacing-vertical-lg);
  gap: var(--eds-spacing-vertical-sm);
`;
```

### Border radius

| Token / value | Use for |
|---|---|
| `--eds-spacing-border-radius-rounded` | Standard rounded corners (cards, buttons) |
| `--eds-spacing-border-radius-none` | Sharp / square corners |
| `--eds-spacing-border-radius-pill` | Full pill (tags, chips) |

These are the radius tokens in `@equinor/eds-tokens` v2. `--eds-shape-corners-border-radius` does not exist; do not use it. Existing `border-radius: 0` or `9999px` values are acceptable and need no migration.

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
