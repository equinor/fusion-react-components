# @equinor/fusion-react-layout

## 0.1.3

### Patch Changes

- a094571: Rename the layout and page web component tags to their `fwc-app-*` names and update the underlying web component dependencies.

## 0.1.2

### Patch Changes

- 934e52c: Forward props from `Page` and its compound slot components to their underlying elements.
  
  Update the underlying layout and page web components to constrain content to the available height, preventing nested content from expanding the viewport and allowing main content to scroll correctly.

## 0.1.1

### Patch Changes

- d0437e6: Upgraded to TypeScript 7.0.2.

## 0.1.0

### Minor Changes

- 060f792: Add React layout and page components for Fusion applications.

  - Exposes slot-based `Layout` and `Page` wrappers backed by Fusion web components.
