---
"@equinor/fusion-react-filter": patch
"@equinor/fusion-react-side-sheet": patch
"@equinor/fusion-react-stepper": patch
---

Refactor for Biome linter compliance

- Update Biome configuration to version 2.2.5
- Fix useEffect dependencies in Stepper component
- Refactor SideSheet Top component to fix linter warnings
- Add proper biome-ignore comments for necessary `any` types
