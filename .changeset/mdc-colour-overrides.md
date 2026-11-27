---
"@equinor/fusion-web-theme": minor
"@equinor/fusion-react-styles": patch
"@equinor/fusion-react-searchable-dropdown": patch
"@equinor/fusion-react-context-selector": patch
---

Theme the Material (MWC) internals of `fwc-select`, `fwc-searchable-dropdown` and the context selector with EDS colour variables, so they follow light and dark mode.

- `@equinor/fusion-web-theme` exports `mdcColorSchemeVariables` and `mdcColorVariables`, which map the `--mdc-theme-text-*`, `--mdc-select-*` and `--mdc-checkbox-*` properties to `--eds-color-*` variables.
- `ThemeProvider` from `@equinor/fusion-react-styles` declares them on `:root`, on every `[data-color-scheme]` element and on `fwc-theme`, which covers `fwc-select` app-wide.
- `Dropdown` and `SearchableDropdown` add them to `fwc-searchable-dropdown`, so the list text, section titles, icons and check boxes are themed outside a `ThemeProvider` too. The context selector inherits this.
