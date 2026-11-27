---
name: equinor-design-system
description: 'Provides subordinate EDS token and Fusion Portal layout lookup; no standalone workflow. USE FOR: CSS custom properties, typography variants, spacing, shadow/elevation tokens, icons, page layout zones. DO NOT USE FOR: React component props/examples (use fusion-research + mcp_fusion_search_eds), general coding, Fusion Framework APIs.'
license: MIT
metadata:
  version: "0.1.3"
  status: experimental
  owner: "@equinor/fusion-core"
  role: subordinate
  tags:
    - eds
    - design-system
    - design-tokens
    - color
    - typography
    - spacing
    - elevation
    - icons
    - layout
    - equinor-brand
    - system-skill
---

# Equinor Design System — Design Rules

Subordinate EDS token/Equinor brand/Portal layout lookup; **no standalone workflow**.
Consumers select relevant topic and apply rules directly. Tokens target `@equinor/eds-tokens`
v2.x used by Fusion apps. Sources: [eds.equinor.com](https://eds.equinor.com) and
[Equinor Communication Toolbox](https://communicationtoolbox.equinor.com).

## Inputs and boundaries

Requested token, typography variant, spacing/radius, elevation, icon or Portal page zone.
Not general coding, Fusion Framework APIs or React component props/examples: use
`fusion-research` + `mcp_fusion_search_eds` for component research, not catalog guesses.

## Safety & constraints

Apply constraints before using any lookup:

- All colors use EDS CSS custom properties (`--eds-color-*`), never raw hex/rgb/named colors.
  Equinor red (`#FF1243`) is primary-logo only, never UI action/semantic color. Prefer CSS
  properties over JS color objects for system dark/light mode.
- Render all text with `Typography` from `@equinor/eds-core-react`; use `variant`, never manual
  `font-size`, `font-family` or `line-height`. Use EDS system font, never override/import Equinor
  marketing font.
- Use axis-appropriate `--eds-spacing-horizontal-<size>` / `--eds-spacing-vertical-<size>` for
  margin/padding/gap, never arbitrary pixels. Radius exceptions stay in spacing lookup.
- EDS v2 has no elevation CSS properties: use `Paper` or JS `Elevation` tokens, never hardcoded
  `box-shadow`.
- Use EDS `Icon` with `@equinor/eds-icons` `data`, not `name`; no direct SVG/third-party icons.
  Names are `snake_case`; accessibility uses `title`; sizes only `16`, `24`, `32`, `40`, `48`.
- Portal owns global header, left rail and outer margins: never duplicate/conflict with shell,
  add root outer `margin`/`padding`, fix root `height` or wrap full page in custom scrolling.
  Browser scroll is standard; deliberately bounded nested grid/table scrolling is allowed.
  Use `@equinor/fusion-react-side-sheet` for right details, not custom positioned overlays.

## Topic lookup

Read only matching skill-local reference; tables/examples retain original guidance independently.

| When | Read | Purpose |
| --- | --- | --- |
| Look up colors, semantics or theme access | `references/colors.md` | Background/text/border tokens, brand red and styled-components example |
| Look up text variants or fonts | `references/typography.md` | Heading/body hierarchy, EDS font and examples |
| Look up spacing or radius | `references/spacing.md` | Axis scales, exact values and radius exceptions |
| Look up shadow/elevation | `references/elevation.md` | Paper or JS token access, no v2 CSS elevation variables |
| Look up icons | `references/icons.md` | Data prop, accessibility, naming and fixed sizes |
| Look up Portal zones or loading/empty/error layout | `references/portal-layout.md` | Shell ownership, root/scroll constraints and state patterns |

## Expected output

Relevant exact token/variant/layout rule and source, applied within consuming task. No new
standalone process or cross-skill reconciliation.

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
