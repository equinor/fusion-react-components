---
"@equinor/fusion-react-styles": patch
---

Raise `@equinor/fusion-wc-theme` to `^1.2.6`, where `<fwc-theme>` always sets `data-color-scheme="light"`. This temporarily keeps EDS colours and native browser controls in light mode inside every `ThemeProvider`, regardless of OS or browser settings.

Ref: equinor/fusion-core-tasks#2120
