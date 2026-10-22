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

## Temporary native-control light mode

`colorVariables` (from `src/styles/colors`) includes a standalone
`color-scheme: only light` declaration. The public aggregate `attributes` inherits
it once. This keeps browser-native controls on a light scheme while Fusion does
not support dark mode, including when the OS preference changes at runtime.
Remove this single entry when Fusion supports dark mode.

This is **not** a complete EDS dark-mode lock. The existing legacy EDS 0.9.2 tokens
use CSS variable references with light fallbacks. Modern EDS token stylesheets can
select dark values through `prefers-color-scheme`; `color-scheme` does not disable
that media query. Consumers using modern EDS must explicitly set
`data-color-scheme="light"` on `html` to select its light palette. This package
does not set that attribute or choose a modern EDS palette.

## Development

From the repository root:

```sh
bun run --cwd packages/theme test
bun run --cwd packages/theme build
bun run check -- packages/theme
```

The test command builds the package first so the DOM-free import check exercises
the published entry point. The committed color snapshot preserves the 75 legacy
declarations and their order; review any snapshot update as a public-output change.
