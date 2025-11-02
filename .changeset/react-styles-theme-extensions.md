---
"@equinor/fusion-react-styles": minor
---

Enhanced theme system with support for extending `FusionTheme` with custom properties, improved nested theme composition, and comprehensive documentation.

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
- **Complete TSDoc Documentation**: All exported functions, types, and interfaces now have comprehensive TSDoc comments with examples, parameter descriptions, and usage patterns
- **Theme Extension Storybook Story**: New `ThemeExtension` story demonstrating how to extend themes with custom properties, including step-by-step examples for type definition, theme creation, and usage with `useTheme` and `makeStyles`

### Changed

- `createTheme` signature now accepts optional `baseTheme` parameter (backward compatible)
- Improved type inference for extended themes in `ThemeProvider`, `useTheme`, and `makeStyles`
- Better handling of nested theme composition when using theme functions in nested `ThemeProvider` components
- **Storybook Stories Updated**: All stories now use theme CSS values (`theme.colors.*.getVariable('color')`, `theme.spacing.*.getVariable('padding')`, `theme.typography.*.style.*`) instead of hardcoded custom CSS, ensuring proper integration with Fusion design system tokens
- **README Updated**: Updated all documentation examples to use correct `getVariable()` API for theme properties

### Technical Details

- Deep merging now correctly handles `StyleProperty` instances (replaces instead of merging)
- Theme composition works correctly with nested `ThemeProvider` components
- All types are properly exported and documented with complete TSDoc comments
- Typography properties accessed via `.style.fontSize`, `.style.fontWeight`, etc. for proper CSS value extraction
- Color properties accessed via `.getVariable('color')` method to get CSS variable strings
- Spacing properties accessed via `.getVariable('padding')` method to get CSS variable strings
- `makeStyles` now returns `Record<ClassKey, string>` where `ClassKey` is inferred from style rules, providing type-safe access to class names when using `createStyles`
