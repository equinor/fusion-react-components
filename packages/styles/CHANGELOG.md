# Change Log

## 2.0.0

### Major Changes

- 07a06d2: Remove `@material-ui/styles` dependency and replace with custom JSS-based implementation for React 19 compatibility.

  ref: https://github.com/equinor/fusion-framework/issues/3698

  ### Breaking Changes
  - Removed `@material-ui/styles` dependency - replaced with direct JSS integration
  - All Material-UI v4 styling APIs are now implemented internally
  - No API changes - existing code should work without modifications

  ### Added
  - Custom `makeStyles` implementation using JSS directly
  - Custom `StylesProvider` with enhanced scope isolation via seed prefixes
  - Custom `ThemeProvider` with React 19 compatibility
  - Comprehensive test suite with Vitest (52 tests, 100% statement coverage)
  - Utility modules in `src/utils/`:
    - `jss-setup.ts` - JSS instance configuration
    - `class-name-generator.ts` - Class name generation logic
    - `sheet-manager.ts` - Stylesheet caching and management
    - `contexts.ts` - React context definitions
  - TSDoc documentation for all exported APIs
  - Updated README with comprehensive documentation

  ### Changed
  - Package now uses JSS directly instead of Material-UI wrapper
  - Improved TypeScript types with better inference
  - Enhanced class name isolation for micro-frontend scenarios

  ### Technical Details
  - React 19 compatible (tested with React ^18 || ^19)
  - Uses JSS v10 with all necessary plugins
  - Maintains backward compatibility with existing API surface
  - Full test coverage with Vitest and React Testing Library

### Minor Changes

- 0a1bf8d: Enhanced theme system with support for extending `FusionTheme` with custom properties, improved nested theme composition, and comprehensive documentation.

  ### Added
  - **Theme Extension Support**: `FusionTheme` now supports extending with custom properties using generics:
    ```typescript
    type MyTheme = FusionTheme<{ colors: { primary: ColorStyleProperty } }>;
    ```
  - **Custom Base Theme Merging**: `createTheme` now accepts an optional `baseTheme` parameter for merging with custom base themes:
    ```typescript
    const extendedTheme = createTheme(
      { colors: { ui: { background__danger: newColor } } },
      outerTheme,
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
  - **Storybook Stories Updated**: All stories now consistently use the `.getVariable()` method for accessing theme CSS values (e.g., `theme.colors.*.getVariable('color')`, `theme.spacing.*.getVariable('padding')`). Direct usage of the `.css` property has been replaced to ensure proper integration with Fusion design system tokens and to match the documented API usage.
  - **README Updated**: Updated all documentation examples to use correct `getVariable()` API for theme properties

  ### Technical Details
  - Deep merging now correctly handles `StyleProperty` instances (replaces instead of merging)
  - Theme composition works correctly with nested `ThemeProvider` components
  - All types are properly exported and documented with complete TSDoc comments
  - Typography properties accessed via `.style.fontSize`, `.style.fontWeight`, etc. for proper CSS value extraction
  - Color properties accessed via `.getVariable('color')` method to get CSS variable strings
  - Spacing properties accessed via `.getVariable('padding')` method to get CSS variable strings
  - `makeStyles` now returns `Record<ClassKey, string>` where `ClassKey` is inferred from style rules, providing type-safe access to class names when using `createStyles`

## 2.0.0-preview.2

### Minor Changes

- 0a1bf8d: Enhanced theme system with support for extending `FusionTheme` with custom properties, improved nested theme composition, and comprehensive documentation.

  ### Added
  - **Theme Extension Support**: `FusionTheme` now supports extending with custom properties using generics:
    ```typescript
    type MyTheme = FusionTheme<{ colors: { primary: ColorStyleProperty } }>;
    ```
  - **Custom Base Theme Merging**: `createTheme` now accepts an optional `baseTheme` parameter for merging with custom base themes:
    ```typescript
    const extendedTheme = createTheme(
      { colors: { ui: { background__danger: newColor } } },
      outerTheme,
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
  - **Storybook Stories Updated**: All stories now use theme CSS values (`theme.colors.*.css`, `theme.spacing.*.css`, `theme.typography.*.style.*`) instead of hardcoded custom CSS, ensuring proper integration with Fusion design system tokens

  ### Technical Details
  - Deep merging now correctly handles `StyleProperty` instances (replaces instead of merging)
  - Theme composition works correctly with nested `ThemeProvider` components
  - All types are properly exported and documented with complete TSDoc comments
  - Typography properties accessed via `.style.fontSize`, `.style.fontWeight`, etc. for proper CSS value extraction
  - Color and spacing properties accessed via `.css` property for CSS variable or value string

## 2.0.0-preview.1

### Major Changes

- 07a06d2: Remove `@material-ui/styles` dependency and replace with custom JSS-based implementation for React 19 compatibility.

  ref: https://github.com/equinor/fusion-framework/issues/3698

  ### Breaking Changes
  - Removed `@material-ui/styles` dependency - replaced with direct JSS integration
  - All Material-UI v4 styling APIs are now implemented internally
  - No API changes - existing code should work without modifications

  ### Added
  - Custom `makeStyles` implementation using JSS directly
  - Custom `StylesProvider` with enhanced scope isolation via seed prefixes
  - Custom `ThemeProvider` with React 19 compatibility
  - Comprehensive test suite with Vitest (52 tests, 100% statement coverage)
  - Utility modules in `src/utils/`:
    - `jss-setup.ts` - JSS instance configuration
    - `class-name-generator.ts` - Class name generation logic
    - `sheet-manager.ts` - Stylesheet caching and management
    - `contexts.ts` - React context definitions
  - TSDoc documentation for all exported APIs
  - Updated README with comprehensive documentation

  ### Changed
  - Package now uses JSS directly instead of Material-UI wrapper
  - Improved TypeScript types with better inference
  - Enhanced class name isolation for micro-frontend scenarios

  ### Technical Details
  - React 19 compatible (tested with React ^18 || ^19)
  - Uses JSS v10 with all necessary plugins
  - Maintains backward compatibility with existing API surface
  - Full test coverage with Vitest and React Testing Library

### Minor Changes

- 0a1bf8d: Enhanced theme system with support for extending `FusionTheme` with custom properties, improved nested theme composition, and comprehensive documentation.

  ### Added
  - **Theme Extension Support**: `FusionTheme` now supports extending with custom properties using generics:
    ```typescript
    type MyTheme = FusionTheme<{ colors: { primary: ColorStyleProperty } }>;
    ```
  - **Custom Base Theme Merging**: `createTheme` now accepts an optional `baseTheme` parameter for merging with custom base themes:
    ```typescript
    const extendedTheme = createTheme(
      { colors: { ui: { background__danger: newColor } } },
      outerTheme,
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
  - **Storybook Stories Updated**: All stories now use theme CSS values (`theme.colors.*.css`, `theme.spacing.*.css`, `theme.typography.*.style.*`) instead of hardcoded custom CSS, ensuring proper integration with Fusion design system tokens

  ### Technical Details
  - Deep merging now correctly handles `StyleProperty` instances (replaces instead of merging)
  - Theme composition works correctly with nested `ThemeProvider` components
  - All types are properly exported and documented with complete TSDoc comments
  - Typography properties accessed via `.style.fontSize`, `.style.fontWeight`, etc. for proper CSS value extraction
  - Color and spacing properties accessed via `.css` property for CSS variable or value string

## 2.0.0-preview.0

### Major Changes

- 07a06d2: Remove `@material-ui/styles` dependency and replace with custom JSS-based implementation for React 19 compatibility.

  ref: https://github.com/equinor/fusion-framework/issues/3698

  ### Breaking Changes
  - Removed `@material-ui/styles` dependency - replaced with direct JSS integration
  - All Material-UI v4 styling APIs are now implemented internally
  - No API changes - existing code should work without modifications

  ### Added
  - Custom `makeStyles` implementation using JSS directly
  - Custom `StylesProvider` with enhanced scope isolation via seed prefixes
  - Custom `ThemeProvider` with React 19 compatibility
  - Comprehensive test suite with Vitest (52 tests, 100% statement coverage)
  - Utility modules in `src/utils/`:
    - `jss-setup.ts` - JSS instance configuration
    - `class-name-generator.ts` - Class name generation logic
    - `sheet-manager.ts` - Stylesheet caching and management
    - `contexts.ts` - React context definitions
  - TSDoc documentation for all exported APIs
  - Updated README with comprehensive documentation

  ### Changed
  - Package now uses JSS directly instead of Material-UI wrapper
  - Improved TypeScript types with better inference
  - Enhanced class name isolation for micro-frontend scenarios

  ### Technical Details
  - React 19 compatible (tested with React ^18 || ^19)
  - Uses JSS v10 with all necessary plugins
  - Maintains backward compatibility with existing API surface
  - Full test coverage with Vitest and React Testing Library

## 1.0.0

### Major Changes

- fbc8188: React 19 compatibility fixes
  - Fixed TypeScript errors related to React 19 type changes
  - Updated `useRef` calls to provide initial values when type is explicitly specified
  - Fixed `HTMLDivElement` type usage to use `Partial<HTMLAttributes<HTMLDivElement>>`
  - Fixed `useFilterSelection` observable type handling for `Set<T>` return type
  - Added proper type annotations for web components
  - Updated component prop types to be compatible with React 19's stricter type checking

  Reference https://github.com/equinor/fusion/issues/696

  Devops: AB#65644

  Thanks to @AndreasPrestHammer for reporting this issue!

## 0.6.5

### Patch Changes

- 63b7e92: Change to biome linting rules

## 0.6.4

### Patch Changes

- f989cb4: re-release, no changes

## 0.6.3

### Patch Changes

- 0d6c000: update wc-components to latest

## 0.6.2

### Patch Changes

- 1d3cff3: Updating fusion-web-theme dependencie

## 0.6.1

### Patch Changes

- 8a7ddd95: build(deps): bump @equinor/fusion-wc-theme from 0.2.35 to 1.1.0

## 0.6.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.5.11 (2023-09-21)

### Bug Fixes

- **react-components:** type fixes ([e475c31](https://github.com/equinor/fusion-react-components/commit/e475c315b9cdad01bd568be39e63b1aa8f309761))

## 0.5.10 (2023-09-18)

### Bug Fixes

- **react-components:** lint errors ([28031ec](https://github.com/equinor/fusion-react-components/commit/28031ecf22b3e405a8a3c797b7e6351bd8547f9d))
- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

## [0.5.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.5.8...@equinor/fusion-react-styles@0.5.9) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.5.8 (2023-08-15)

### Bug Fixes

- **style:** build fix ([df68ce8](https://github.com/equinor/fusion-react-components/commit/df68ce8ebc92381a566eed2057204ea2047be703))

## 0.5.7 (2023-07-13)

### Bug Fixes

- **styles:** bumping wc-theme to correct version ([38c3893](https://github.com/equinor/fusion-react-components/commit/38c38930cb27e117d1138f1814386e40bc708a1c))

## 0.5.6 (2023-06-16)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.5.5 (2022-09-16)

### Bug Fixes

- **styles:** peer deps ([d6a3b45](https://github.com/equinor/fusion-react-components/commit/d6a3b4579144bdd12c1e8bfa5760e66be288ed7f))

## [0.5.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.5.3...@equinor/fusion-react-styles@0.5.4) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.5.3 (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.5.2 (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.5.1 (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-styles

# 0.5.0 (2022-01-03)

### Features

- **tooltip:** end of line in tsconfig file + desc ([6c7fb66](https://github.com/equinor/fusion-react-components/commit/6c7fb66983274868c455df32609b3baa68b832e0))

## [0.4.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.4.2...@equinor/fusion-react-styles@0.4.3) (2021-11-23)

### Bug Fixes

- **style:** fix create-style properties ([23d9c8a](https://github.com/equinor/fusion-react-components/commit/23d9c8a9d3831e5beca9b5ff58e951bd1ba1e809))

## [0.4.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.4.1...@equinor/fusion-react-styles@0.4.2) (2021-11-22)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.4.1 (2021-11-22)

### Bug Fixes

- **styles:** re-export create style function ([4655862](https://github.com/equinor/fusion-react-components/commit/4655862aa2388675a02bbde8d9b89dcee7aa67cd))

# 0.4.0 (2021-11-08)

### Features

- expose theme provider ([b5b664d](https://github.com/equinor/fusion-react-components/commit/b5b664dadfcd34bd3f9312bc44bfa21f328a6462))

## [0.3.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.3.6...@equinor/fusion-react-styles@0.3.7) (2021-10-29)

### Bug Fixes

- updated packages ([4298c77](https://github.com/equinor/fusion-react-components/commit/4298c778c4c5385398a92d8b71feee3b17ba64c0))

## 0.3.6 (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-styles

## [0.3.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.3.4...@equinor/fusion-react-styles@0.3.5) (2021-09-30)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.3.4 (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-styles

## [0.3.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.3.2...@equinor/fusion-react-styles@0.3.3) (2021-09-27)

### Bug Fixes

- update to lit create element method ([ec68c08](https://github.com/equinor/fusion-react-components/commit/ec68c08d5cbcba43a1b8ca064cccc73662f17421))

## [0.3.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.3.1...@equinor/fusion-react-styles@0.3.2) (2021-09-23)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.3.1 (2021-09-16)

**Note:** Version bump only for package @equinor/fusion-react-styles

# 0.3.0 (2021-09-08)

### Features

- add theme provider ([ad17d8e](https://github.com/equinor/fusion-react-components/commit/ad17d8e4938ae0057e53fe64edbe084406f28c5f))

## 0.2.2 (2021-09-07)

**Note:** Version bump only for package @equinor/fusion-react-styles

## 0.2.1 (2021-07-14)

### Bug Fixes

- updated packages ([6d8da47](https://github.com/equinor/fusion-react-components/commit/6d8da478103a94b34a3e0a3d107633f77ef4e7aa))

# 0.2.0 (2021-07-05)

### Features

- added theme provider ([a7e3e3f](https://github.com/equinor/fusion-react-components/commit/a7e3e3f0657ce4d5659bb387ca71d823242df20f))

## 0.1.3 (2021-06-28)

**Note:** Version bump only for package @equinor/fusion-react-styles

## [0.1.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.1.1...@equinor/fusion-react-styles@0.1.2) (2021-06-23)

### Bug Fixes

- fixed css styling issue ([809e1bf](https://github.com/equinor/fusion-react-components/commit/809e1bfaac0a99d0bda3b32d49d51e2043428171))

## 0.1.1 (2021-06-17)

### Bug Fixes

- fixed linting ([0278fb0](https://github.com/equinor/fusion-react-components/commit/0278fb00da66f4cf6be855fc66eaa06074806465))

# [0.1.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.1.0-alpha.2...@equinor/fusion-react-styles@0.1.0) (2021-03-23)

**Note:** Version bump only for package @equinor/fusion-react-styles

# [0.1.0-alpha.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.1.0-alpha.1...@equinor/fusion-react-styles@0.1.0-alpha.2) (2021-03-18)

**Note:** Version bump only for package @equinor/fusion-react-styles

# [0.1.0-alpha.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-styles@0.1.0-alpha.0...@equinor/fusion-react-styles@0.1.0-alpha.1) (2021-03-18)

**Note:** Version bump only for package @equinor/fusion-react-styles

# 0.1.0-alpha.0 (2021-03-18)

### Features

- add style generator ([4cd37fe](https://github.com/equinor/fusion-react-components/commit/4cd37fe2f87ed90bd46f7a72921e6a2b4c5ea3a0))
