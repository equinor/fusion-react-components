# EDS Dynamic Color Tokens

These tokens resolve per semantic category set via `data-color-appearance` on a parent element.
The CSS variable names omit the category — the attribute controls which palette is active.

Install: `pnpm install @equinor/eds-tokens`
Import: `@import '@equinor/eds-tokens/css/variables';`

## Accent (`data-color-appearance="accent"`)

| CSS Variable | Value |
|---|---|
| `--eds-color-bg-fill-muted-default` | `#cfe7e9` |
| `--eds-color-bg-fill-muted-hover` | `#bbdbdf` |
| `--eds-color-bg-fill-muted-active` | `#a2cdd2` |
| `--eds-color-bg-fill-muted-disabled` | `#cfe7e9` |
| `--eds-color-bg-fill-emphasis-default` | `#206f77` |
| `--eds-color-bg-fill-emphasis-hover` | `#205c62` |
| `--eds-color-bg-fill-emphasis-active` | `#20565c` |
| `--eds-color-bg-fill-emphasis-disabled` | `#cfe7e9` |
| `--eds-color-bg-canvas` | `#eaf8fa` |
| `--eds-color-bg-surface` | `#f6ffff` |
| `--eds-color-border-subtle` | `#bbdbdf` |
| `--eds-color-border-medium` | `#7cbac1` |
| `--eds-color-border-strong` | `#21767e` |
| `--eds-color-border-disabled` | `#7cbac1` |
| `--eds-color-text-subtle` | `#1f6369` |
| `--eds-color-text-strong` | `#141f20` |
| `--eds-color-text-disabled` | `#7cbac1` |
| `--eds-color-text-subtle-on-emphasis` | `#cae4e7` |
| `--eds-color-text-strong-on-emphasis` | `#ffffff` |

## Neutral (`data-color-appearance="neutral"`)

| CSS Variable | Value |
|---|---|
| `--eds-color-bg-fill-muted-default` | `#e1e1e1` |
| `--eds-color-bg-fill-muted-hover` | `#d4d4d4` |
| `--eds-color-bg-fill-muted-active` | `#c4c4c4` |
| `--eds-color-bg-fill-muted-disabled` | `#e1e1e1` |
| `--eds-color-bg-fill-emphasis-default` | `#636363` |
| `--eds-color-bg-fill-emphasis-hover` | `#525252` |
| `--eds-color-bg-fill-emphasis-active` | `#4d4d4d` |
| `--eds-color-bg-fill-emphasis-disabled` | `#e1e1e1` |
| `--eds-color-bg-canvas` | `#f5f5f5` |
| `--eds-color-bg-surface` | `#ffffff` |
| `--eds-color-border-subtle` | `#d4d4d4` |
| `--eds-color-border-medium` | `#aeaeae` |
| `--eds-color-border-strong` | `#696969` |
| `--eds-color-border-disabled` | `#aeaeae` |
| `--eds-color-text-subtle` | `#585858` |
| `--eds-color-text-strong` | `#1d1d1d` |
| `--eds-color-text-disabled` | `#aeaeae` |
| `--eds-color-text-subtle-on-emphasis` | `#dedede` |
| `--eds-color-text-strong-on-emphasis` | `#ffffff` |

## Success (`data-color-appearance="success"`)

| CSS Variable | Value |
|---|---|
| `--eds-color-bg-fill-muted-default` | `#cfeacc` |
| `--eds-color-bg-fill-muted-hover` | `#bbe0b8` |
| `--eds-color-bg-fill-muted-active` | `#a2d49e` |
| `--eds-color-bg-fill-muted-disabled` | `#cfeacc` |
| `--eds-color-bg-fill-emphasis-default` | `#207720` |
| `--eds-color-bg-fill-emphasis-hover` | `#20621f` |
| `--eds-color-bg-fill-emphasis-active` | `#215c1f` |
| `--eds-color-bg-fill-emphasis-disabled` | `#cfeacc` |
| `--eds-color-bg-canvas` | `#eafbe8` |
| `--eds-color-bg-surface` | `#f6fff5` |
| `--eds-color-border-subtle` | `#bbe0b8` |
| `--eds-color-border-medium` | `#7cc278` |
| `--eds-color-border-strong` | `#227e22` |
| `--eds-color-border-disabled` | `#7cc278` |
| `--eds-color-text-subtle` | `#20691f` |
| `--eds-color-text-strong` | `#142114` |
| `--eds-color-text-disabled` | `#7cc278` |
| `--eds-color-text-subtle-on-emphasis` | `#cae8c7` |
| `--eds-color-text-strong-on-emphasis` | `#ffffff` |

## Info (`data-color-appearance="info"`)

| CSS Variable | Value |
|---|---|
| `--eds-color-bg-fill-muted-default` | `#cae6fa` |
| `--eds-color-bg-fill-muted-hover` | `#b5daf5` |
| `--eds-color-bg-fill-muted-active` | `#99cbf0` |
| `--eds-color-bg-fill-muted-disabled` | `#cae6fa` |
| `--eds-color-bg-fill-emphasis-default` | `#006aa0` |
| `--eds-color-bg-fill-emphasis-hover` | `#085883` |
| `--eds-color-bg-fill-emphasis-active` | `#0e5279` |
| `--eds-color-bg-fill-emphasis-disabled` | `#cae6fa` |
| `--eds-color-bg-canvas` | `#e7f8ff` |
| `--eds-color-bg-surface` | `#f4ffff` |
| `--eds-color-border-subtle` | `#b5daf5` |
| `--eds-color-border-medium` | `#6fb6e9` |
| `--eds-color-border-strong` | `#0070a9` |
| `--eds-color-border-disabled` | `#6fb6e9` |
| `--eds-color-text-subtle` | `#015e8d` |
| `--eds-color-text-strong` | `#121e27` |
| `--eds-color-text-disabled` | `#6fb6e9` |
| `--eds-color-text-subtle-on-emphasis` | `#c5e3f9` |
| `--eds-color-text-strong-on-emphasis` | `#ffffff` |

## Warning (`data-color-appearance="warning"`)

| CSS Variable | Value |
|---|---|
| `--eds-color-bg-fill-muted-default` | `#fbdac1` |
| `--eds-color-bg-fill-muted-hover` | `#f6caaa` |
| `--eds-color-bg-fill-muted-active` | `#f0b689` |
| `--eds-color-bg-fill-muted-disabled` | `#fbdac1` |
| `--eds-color-bg-fill-emphasis-default` | `#9b4900` |
| `--eds-color-bg-fill-emphasis-hover` | `#813e00` |
| `--eds-color-bg-fill-emphasis-active` | `#773a00` |
| `--eds-color-bg-fill-emphasis-disabled` | `#fbdac1` |
| `--eds-color-bg-canvas` | `#fff1e2` |
| `--eds-color-bg-surface` | `#fffcf0` |
| `--eds-color-border-subtle` | `#f6caaa` |
| `--eds-color-border-medium` | `#e89959` |
| `--eds-color-border-strong` | `#a34e00` |
| `--eds-color-border-disabled` | `#e89959` |
| `--eds-color-text-subtle` | `#8a4100` |
| `--eds-color-text-strong` | `#27190e` |
| `--eds-color-text-disabled` | `#e89959` |
| `--eds-color-text-subtle-on-emphasis` | `#fad6bc` |
| `--eds-color-text-strong-on-emphasis` | `#ffffff` |

## Danger (`data-color-appearance="danger"`)

| CSS Variable | Value |
|---|---|
| `--eds-color-bg-fill-muted-default` | `#ffd0ce` |
| `--eds-color-bg-fill-muted-hover` | `#ffbcba` |
| `--eds-color-bg-fill-muted-active` | `#ffa3a1` |
| `--eds-color-bg-fill-muted-disabled` | `#ffd0ce` |
| `--eds-color-bg-fill-emphasis-default` | `#bc002a` |
| `--eds-color-bg-fill-emphasis-hover` | `#9a1026` |
| `--eds-color-bg-fill-emphasis-active` | `#8e1525` |
| `--eds-color-bg-fill-emphasis-disabled` | `#ffd0ce` |
| `--eds-color-bg-canvas` | `#ffecea` |
| `--eds-color-bg-surface` | `#fff9f8` |
| `--eds-color-border-subtle` | `#ffbcba` |
| `--eds-color-border-medium` | `#ff7a7d` |
| `--eds-color-border-strong` | `#c6002d` |
| `--eds-color-border-disabled` | `#ff7a7d` |
| `--eds-color-text-subtle` | `#a50827` |
| `--eds-color-text-strong` | `#2e1414` |
| `--eds-color-text-disabled` | `#ff7a7d` |
| `--eds-color-text-subtle-on-emphasis` | `#ffcbc9` |
| `--eds-color-text-strong-on-emphasis` | `#ffffff` |
