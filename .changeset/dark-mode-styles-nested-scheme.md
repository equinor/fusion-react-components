---
'@equinor/fusion-react-styles': patch
---

`EdsTokens` re-declares the EDS semantic colour aliases on every `[data-color-scheme]` element, so a dark subtree below a light root (for example a dark `<body>` with portaled content under a light `<html>`) resolves dark values instead of inheriting light ones.
