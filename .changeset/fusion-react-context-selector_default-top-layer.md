---
"@equinor/fusion-react-context-selector": minor
---

`ContextSelector` and `ContextSearch` now default the underlying `topLayer` prop to `true`,
so context selector results render in the browser's top layer (via the Popover API) and
reliably appear above any stacking context a hosting Fusion app happens to create, without
app teams having to manage z-index. Pass `topLayer={false}` to opt back out.

This default only takes effect once the `@equinor/fusion-wc-searchable-dropdown` dependency
supports `topLayer` (added as a minor release from 4.1.3, expected `4.2.0` - see
[equinor/fusion-web-components#2368](https://github.com/equinor/fusion-web-components/pull/2368)).
Until that version is installed, setting `topLayer` is a harmless no-op and existing
behavior is unchanged.

Refs [equinor/fusion-core-tasks#1428](https://github.com/equinor/fusion-core-tasks/issues/1428).
