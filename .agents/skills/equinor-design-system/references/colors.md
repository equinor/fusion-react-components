# EDS color tokens lookup

## Contents

- [Color tokens](#color-tokens)
- [Background tokens](#background-tokens)
- [Text tokens](#text-tokens)
- [Border tokens](#border-tokens)
- [Token access in code](#token-access-in-code)
- [Sources](#sources)


## Color tokens
Use **EDS CSS custom properties** (`--eds-color-*`) for all color values. Never use raw hex, rgb(), or named CSS colors in Fusion app code. All tokens below are from `@equinor/eds-tokens` v2.x (the version Fusion apps depend on).

> Token naming pattern: `--eds-color-<layer>-<semantic>-<variant>`
> - `bg` = background fill
> - `text` = foreground text / icon
> - `border` = stroke / divider

### Background tokens

| Purpose | EDS token |
|---|---|
| Page / app canvas | `--eds-color-bg-canvas` |
| Surface (card, panel) | `--eds-color-bg-surface` |
| Input field background | `--eds-color-bg-input` |
| Floating surface (dropdown, tooltip) | `--eds-color-bg-floating` |
| Backdrop / modal scrim | `--eds-color-bg-backdrop` |
| Primary action fill (default) | `--eds-color-bg-fill-emphasis-default` |
| Primary action fill (hover) | `--eds-color-bg-fill-emphasis-hover` |
| Primary action fill (active) | `--eds-color-bg-fill-emphasis-active` |
| Muted fill (default) | `--eds-color-bg-fill-muted-default` |
| Muted fill (hover) | `--eds-color-bg-fill-muted-hover` |
| Disabled surface | `--eds-color-bg-disabled` |
| Success surface (subtle bg) | `--eds-color-bg-success-surface` |
| Success fill (emphasis) | `--eds-color-bg-success-fill-emphasis-default` |
| Warning surface | `--eds-color-bg-warning-surface` |
| Warning fill (emphasis) | `--eds-color-bg-warning-fill-emphasis-default` |
| Danger / error surface | `--eds-color-bg-danger-surface` |
| Danger fill (emphasis) | `--eds-color-bg-danger-fill-emphasis-default` |
| Info surface | `--eds-color-bg-info-surface` |
| Info fill (emphasis) | `--eds-color-bg-info-fill-emphasis-default` |
| Accent surface | `--eds-color-bg-accent-surface` |
| Accent fill (emphasis) | `--eds-color-bg-accent-fill-emphasis-default` |

### Text tokens

| Purpose | EDS token |
|---|---|
| Primary body text | `--eds-color-text-strong` |
| Text on emphasis/filled backgrounds | `--eds-color-text-strong-on-emphasis` |
| Subtle / secondary text | `--eds-color-text-subtle` |
| Disabled text | `--eds-color-text-disabled` |
| Link | `--eds-color-text-link` |
| Success text | `--eds-color-text-success-strong` |
| Success text (subtle) | `--eds-color-text-success-subtle` |
| Warning text | `--eds-color-text-warning-strong` |
| Danger / error text | `--eds-color-text-danger-strong` |
| Info text | `--eds-color-text-info-strong` |
| Accent text | `--eds-color-text-accent-strong` |

### Border tokens

| Purpose | EDS token |
|---|---|
| Default divider / border | `--eds-color-border-medium` |
| Subtle border | `--eds-color-border-subtle` |
| Strong border | `--eds-color-border-strong` |
| Focus ring | `--eds-color-border-focus` |
| Disabled border | `--eds-color-border-disabled` |
| Success border | `--eds-color-border-success-medium` |
| Warning border | `--eds-color-border-warning-medium` |
| Danger border | `--eds-color-border-danger-medium` |
| Info border | `--eds-color-border-info-medium` |
| Accent border | `--eds-color-border-accent-medium` |

> **Brand constraint**: Equinor red (`#FF1243`) is used in the primary logo only — never as a UI action or semantic color. Use EDS color tokens for all clickable and semantic surfaces.

### Token access in code

Prefer EDS CSS custom properties in styled-components over the `@equinor/eds-tokens` JS object when possible — they respect system dark/light mode automatically.

```typescript
import styled from 'styled-components';

const Card = styled.div`
  background: var(--eds-color-bg-surface);
  border: 1px solid var(--eds-color-border-medium);
  color: var(--eds-color-text-strong);
`;

const PrimaryButton = styled.button`
  background: var(--eds-color-bg-fill-emphasis-default);
  color: var(--eds-color-text-strong-on-emphasis);

  &:hover {
    background: var(--eds-color-bg-fill-emphasis-hover);
  }

  &:disabled {
    background: var(--eds-color-bg-disabled);
    color: var(--eds-color-text-disabled);
  }
`;
```

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
