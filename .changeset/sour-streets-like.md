---
"@equinor/fusion-react-filter": minor
---

Rewrote all component styles from `@equinor/fusion-react-styles` (JSS) to `styled-components`.

- Replaced all `makeStyles`/`createStyles` hooks with `styled-components` tagged template literals
- Grouped styled components into a `Styled` object per file (e.g. `Styled.Root`, `Styled.Items`) following the pattern used across other packages in the monorepo
- Replaced `@equinor/fusion-web-theme` token access (via JSS theme callbacks) with static `@equinor/eds-tokens` imports
- Removed dependency on `@equinor/fusion-react-styles`; added `styled-components` and `@equinor/eds-tokens` as direct dependencies
- Removed the `../styles` project reference from `tsconfig.json`

Affected components: `CheckboxFilter`, `CheckboxFilterOption`, `FilterOptionHeader`, `FilterPanel`, `FilterPanelBar`, `FilterContainer`, `SelectionChips`
