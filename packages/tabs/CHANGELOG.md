# Change Log

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
