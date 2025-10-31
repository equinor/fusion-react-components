---
"@equinor/fusion-react-components-stories": patch
---

Add comprehensive Storybook documentation and stories for `@equinor/fusion-react-styles` package.

ref: https://github.com/equinor/fusion-framework/issues/3698

### Added

- **Styles Documentation (`styles.mdx`)**: Comprehensive MDX documentation page showcasing all styling features
- **Story Groups**: Organized stories into logical groups:
  - **Basic Usage**: Basic styles, dynamic styles, and theme-based styles
  - **Scope Isolation**: Demonstrates critical micro-frontend style isolation with nested and side-by-side `StylesProvider` examples
  - **Advanced Features**: Nested selectors, multiple style rules, and style caching
  - **Theme System**: Theme composition and `useTheme` hook examples
  - **Utilities**: `createStyles` helper examples
- **Visual Demonstrations**: Interactive stories showing:
  - Class name generation and isolation
  - Dynamic style updates based on props
  - Theme integration
  - CSS features like nested selectors and hover states

### Changed

- Storybook port updated to 3000
- Removed `@material-ui/styles` dependency from Storybook package

