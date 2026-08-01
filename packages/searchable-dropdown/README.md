<!--prettier-ignore-start-->

# @equinor/fusion-react-searchable-dropdown

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-searchable-dropdown.svg)](https://www.npmjs.com/package/@equinor/fusion-react-searchable-dropdown)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/data-searchabledropdown)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/searchable-dropdown)

### Installation

```sh
npm install @equinor/fusion-react-searchable-dropdown
```

### Rendering the result list above arbitrary stacking contexts

`Dropdown`/`SearchableDropdown` forward an opt-in `topLayer` boolean prop (default `false`,
matching the underlying `fwc-searchable-dropdown` element) to render the result list in the
browser's top layer via the native
[Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API) instead of a
shadow-DOM-relative, absolutely positioned box. This is useful when the result list must
reliably render above content that creates its own independent stacking context. Falls back
automatically to the previous behavior when the Popover API is unsupported.

```tsx
<Dropdown topLayer />
```

> `@equinor/fusion-react-context-selector` enables `topLayer` by default, since context
> selector results are portal-owned UI that must render above arbitrary Fusion app stacking
> contexts. See [equinor/fusion-web-components#2368](https://github.com/equinor/fusion-web-components/pull/2368)
> and [equinor/fusion-core-tasks#1428](https://github.com/equinor/fusion-core-tasks/issues/1428).
