# Change Log

## 2.0.4

### Patch Changes

- 2338333: Bump `@equinor/fusion-observable` from 9.0.0 to 9.0.1 — internal `uuid` dependency updated from 13.0.0 to 14.0.0.
- 2338333: Bump `styled-components` from 6.4.0 to 6.4.1 — fixes a performance regression in `createGlobalStyle` and updates stale dev-mode error messages.
- 2338333: Bump `typescript` from 6.0.2 to 6.0.3 — hardens ATA package name filtering and fixes class property initializer handling.
- 0be8bd4: build(deps): bump @equinor/eds-core-react from 0.45.1 to 2.5.0

  Align peerDependencies with updated eds packages.

## 2.0.3

### Patch Changes

- 445bd76: Remove sourcemap generation from build output. Published packages no longer ship broken `.js.map` files that referenced missing source files, eliminating console warnings for consumers.

## 2.0.2

### Patch Changes

- e942e21: Remove the "ignoreDeprecations" tsconfig property and fix build errors

## 2.0.1

### Patch Changes

- e3bea9f: Update `@equinor/eds-tokens@2.2.0` and align peerDependency versions.

## 2.0.0

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

## 1.0.2

### Patch Changes

- 4298847: Fix tab change handler parameter type to accept string | number

  Updated the handleOnChange callback in Tabs component to properly handle both string and number types for the tab parameter, ensuring compatibility with the EdsTabs.

## 1.0.1

### Patch Changes

- 02fc06f: package alterations
