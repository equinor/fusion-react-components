# @equinor/fusion-web-theme

Fusion theme style properties and CSS declarations for colors, elevation, spacing,
and typography.

## Apply the theme

Importing the package only creates theme data: it does not inject CSS, access the
DOM, or change HTML attributes. Consumers must emit the exported declarations in
their root stylesheet, for example with their existing CSS-in-JS integration:

```ts
import { attributes } from '@equinor/fusion-web-theme';

const rootCss = `:root { ${attributes.join(';')}; }`;
```

Apply this CSS to the document root before the first paint to cover native controls
from startup, including controls in overlays mounted under `body`. Scoping the
declarations to an app container does not cover overlays outside that container.
If the consuming stylesheet loads later, protection only starts when it applies.

## Colour scheme (light / dark)

The package does not force a colour scheme. Most colour properties resolve to an
EDS 2.x colour-scheme-aware CSS custom property, without a literal colour fallback,
for example:

```css
var(--fusion-color__interactive-primary__resting, var(--eds-color-bg-accent-fill-emphasis-default))
```

- The `--eds-color-*` variables come from `@equinor/eds-tokens/css/variables` (2.x).
  Load that stylesheet (for example through `ThemeProvider` from
  `@equinor/fusion-react-styles`); the host must load it, because mapped colours have no literal fallback.
- Select the scheme with `data-color-scheme="light"` or `"dark"` on `<html>` or any
  ancestor element. Without the attribute, EDS follows `prefers-color-scheme` at the
  document root.
- `colorSchemeVariables` in `src/styles/colors.ts` is a Fusion-owned approximation:
  EDS publishes no official legacy-to-2.x mapping. Infographic, logo, snackbar link and
  overlay/scrim colours are intentionally unmapped and stay static.
- `getVariable()` values resolve where they are used, so they follow subtree scopes.
  Declaring `attributes` on `:root` resolves the `--fusion-color__*` variables once at
  the root; such variables follow a scheme set on `<html>`, but not one set on a
  descendant element.
- Typography colours resolve to `--eds-color-text-neutral-strong` (paragraph links:
  `--eds-color-text-accent-subtle`), including `--fusion-typography__base-color`.
- `hex` and `hsla` values remain the static legacy light values.

## Development

From the repository root:

```sh
bun run --cwd packages/theme test
bun run --cwd packages/theme build
bun run check -- packages/theme
```

The test command builds the package first so the DOM-free import check exercises
the published entry point. The committed color snapshot preserves the 75 color
declarations and their order; review any snapshot update as a public-output change.
