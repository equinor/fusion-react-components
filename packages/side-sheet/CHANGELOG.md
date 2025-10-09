# Change Log

## 1.3.12

### Patch Changes

- 65d1b87: Refactor for Biome linter compliance
  - Update Biome configuration to version 2.2.5
  - Fix useEffect dependencies in Stepper component
  - Refactor SideSheet Top component to fix linter warnings
  - Add proper biome-ignore comments for necessary `any` types

## 1.3.11

### Patch Changes

- 8b87f49: Position action buttons when no title is used

  Update storybook examples

## 1.3.10

### Patch Changes

- 93cae6b: Improve sidesheet component to work without title

## 1.3.9

### Patch Changes

- 63b7e92: Change to biome linting rules

## 1.3.8

### Patch Changes

- 2123709: Updating dependency react-keyed-flatten-children@5.0.0 to new major version

## 1.3.7

### Patch Changes

- eab8811: Added z-index to buttons

## 1.3.6

### Patch Changes

- 267dd50: Add custom variables for side sheet header height and padding

## 1.3.5

### Patch Changes

- f989cb4: re-release, no changes

## 1.3.4

### Patch Changes

- f449132: Add `shouldAnimate` as allowed attribute.

## 1.3.3

### Patch Changes

- b44a91b: Tooltip for full screen and close buttons

## 1.3.2

### Patch Changes

- cd87cca: Updating @equinor/eds-core-react to 0.37.0

## 1.3.1

### Patch Changes

- d07f10a: - Added a new dependency: `"react-keyed-flatten-children": "^3.0.0"` to `package.json`.
  - Imported the `flattenChildren` function from the `react-keyed-flatten-children` package in `SideSheet.tsx`.
  - Replaced the `React.Children.forEach` method with the `flattenChildren(children).reduce` method to iterate over the children of the `SideSheet` component.
  - Instead of assigning child components to the `components` object inside the `forEach` callback, you're now doing it inside the `reduce` callback and returning the accumulated object.
  - The `components` object is now created by the `reduce` method instead of being predefined.
  - The changes improve the way child components are assigned to the `components` object and flatten the children of the `SideSheet` component.

- d07f10a: - Exported various components and types from different files.
  - Updated exports to use the `type` keyword for certain types.

## 1.3.0

### Minor Changes

- a0a521d: Adding the ability to toggle the side-sheet animation, by passing `boolean` to the `animate` prop
  - Fixing the full-screen button
  - Updating eds packages
  - Fixing indicator size according to ux request now 8px

## 1.2.5

### Patch Changes

- c719c248: Content height adjustment for 100% height

## 1.2.4

### Patch Changes

- 2fee8065: Sidesheet content height adjustment

## 1.2.3

### Patch Changes

- cc41a1a9: build(deps): bump @equinor/eds-core-react from 0.30.0 to 0.34.0

## 1.2.2

### Patch Changes

- 543811b0: The side-sheet should be displayed beneath the portal header, ensuring that no content is obscured or hidden.

## 1.2.1

### Patch Changes

- 59771d08: Added missing border radius to side sheet indicator

## 1.2.0

### Minor Changes

- 1aecd0e3: update EDS to @0.33.0

## 1.1.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.0.2 (2023-09-18)

### Bug Fixes

- **react-components:** lint errors ([28031ec](https://github.com/equinor/fusion-react-components/commit/28031ecf22b3e405a8a3c797b7e6351bd8547f9d))

## [1.0.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-side-sheet@1.0.0...@equinor/fusion-react-side-sheet@1.0.1) (2023-07-25)

### Bug Fixes

- **side-sheet:** simplify-style ([d031068](https://github.com/equinor/fusion-react-components/commit/d031068d73aa3d44794ffe4537120557b31ff640))

# 1.0.0 (2023-07-25)

### Features

- **side-sheet:** remove emotion ([acc4b5a](https://github.com/equinor/fusion-react-components/commit/acc4b5affcb44fd34dee8c970c295317d4157fb7))
- **side-sheet:** remove emotion ([452d490](https://github.com/equinor/fusion-react-components/commit/452d490100b6f3b77fe14b3e7cdfa30517c167ba))

# 0.1.0 (2023-04-18)

### Features

- **side-sheet:** fusion side sheet component ([f44bdaa](https://github.com/equinor/fusion-react-components/commit/f44bdaa5fa50b0352340624f79722e23b2fe51aa))
