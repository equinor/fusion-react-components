---
"@equinor/fusion-react-filter": patch
---

Prevent `FilterOptionHeader` from entering an infinite render loop after upgrading `@equinor/fusion-observable` by keeping its selection count selector stable across renders.
