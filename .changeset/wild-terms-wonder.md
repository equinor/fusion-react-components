---
"@equinor/fusion-react-filter": patch
"@equinor/fusion-react-person": patch
"@equinor/fusion-react-side-sheet": patch
"@equinor/fusion-react-stepper": patch
"@equinor/fusion-react-styles": patch
"@equinor/fusion-react-tabs": patch
"@equinor/fusion-react-utils": patch
---

Refactor reduce with Object.assign to for loops for Biome linter compliance

- Replace all instances of `reduce` with `Object.assign` on accumulators with `for` loops to comply with Biome linter rules
- Fix useEffect dependencies in Stepper component
- Refactor SideSheet Top component to fix linter warnings
- Update Tab test to use unique IDs
- Add proper biome-ignore comments for necessary `any` types
- Update Biome configuration to version 2.2.5