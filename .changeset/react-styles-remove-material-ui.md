---
"@equinor/fusion-react-styles": major
---

Remove `@material-ui/styles` dependency and replace with custom JSS-based implementation for React 19 compatibility.

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
