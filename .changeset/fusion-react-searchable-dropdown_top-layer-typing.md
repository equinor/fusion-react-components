---
"@equinor/fusion-react-searchable-dropdown": minor
---

Adds type support for the upcoming `topLayer` boolean prop on `Dropdown`/`SearchableDropdown`,
forwarded to the underlying `fwc-searchable-dropdown` element. When enabled, the result list
renders in the browser's top layer via the native Popover API instead of a shadow-DOM-relative,
absolutely positioned box, so it can reliably render above content with its own stacking
context. Default behavior is unchanged (`topLayer` defaults to `false`, matching the
underlying element).

This prop only has an effect once the `@equinor/fusion-wc-searchable-dropdown` dependency
supports `topLayer` (added as a minor release from 4.1.3, expected `4.2.0` - see
[equinor/fusion-web-components#2368](https://github.com/equinor/fusion-web-components/pull/2368)).
Until that version is installed, passing `topLayer` is a harmless no-op.

Refs [equinor/fusion-core-tasks#1428](https://github.com/equinor/fusion-core-tasks/issues/1428).
