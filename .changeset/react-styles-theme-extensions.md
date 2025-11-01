---
"@equinor/fusion-react-styles": minor
---

Enhanced theme system with support for extending `FusionTheme` with custom properties and improved nested theme composition.

### Added

- **Theme Extension Support**: `FusionTheme` now supports extending with custom properties using generics:
  ```typescript
  type MyTheme = FusionTheme<{ colors: { primary: ColorStyleProperty } }>;
  ```
- **Custom Base Theme Merging**: `createTheme` now accepts an optional `baseTheme` parameter for merging with custom base themes:
  ```typescript
  const extendedTheme = createTheme(
    { colors: { ui: { background__danger: newColor } } },
    outerTheme
  );
  ```
- **Deep Merging Improvements**: Enhanced `deepMerge` function properly handles nested theme properties, `Record` types, and `StyleProperty` instances
- **Type Exports**: Explicitly exported `ThemeProviderProps`, `StylesProviderProps`, `FusionTheme`, `StyleDefinition`, and `createTheme` for better TypeScript support

### Changed

- `createTheme` signature now accepts optional `baseTheme` parameter (backward compatible)
- Improved type inference for extended themes in `ThemeProvider`, `useTheme`, and `makeStyles`
- Better handling of nested theme composition when using theme functions in nested `ThemeProvider` components

### Technical Details

- Deep merging now correctly handles `StyleProperty` instances (replaces instead of merging)
- Theme composition works correctly with nested `ThemeProvider` components
- All types are properly exported and documented
