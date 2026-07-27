<!--prettier-ignore-start-->
# @equinor/fusion-react-context-selector

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-context-selector.svg)](https://www.npmjs.com/package/@equinor/fusion-react-context-selector)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/data-contextselector)

Extending [fusion-react-searchable-dropdown](https://equinor.github.io/fusion-react-components/?path=/docs/data-searchable-dropdown)

Built on Web-Component [Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/searchable-dropdown)

### Installation

```sh
npm install @equinor/fusion-react-context-selector
```

### Rendering above arbitrary Fusion app stacking contexts

Context selector results are portal-owned UI: they must reliably render above whatever
stacking context a hosting Fusion app happens to create (dialogs, transformed/filtered
containers, etc.), without app teams having to manage z-index. `ContextSelector` and
`ContextSearch` therefore default the underlying `topLayer` prop to `true`, rendering the
result list in the browser's top layer via the native
[Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API) instead of a
shadow-DOM-relative, absolutely positioned box. Falls back automatically to the previous
behavior in browsers without Popover API support.

Pass `topLayer={false}` explicitly to opt back out of this default:

```tsx
<ContextSearch topLayer={false} />
```

See [equinor/fusion-web-components#2368](https://github.com/equinor/fusion-web-components/pull/2368)
and [equinor/fusion-core-tasks#1428](https://github.com/equinor/fusion-core-tasks/issues/1428).

> **Note:** this default only takes effect once `@equinor/fusion-wc-searchable-dropdown` is
> upgraded to a version that supports `topLayer` (published as a minor release from 4.1.3,
> expected `4.2.0`). Until then, setting `topLayer` is a harmless no-op and behavior is
> unchanged.
