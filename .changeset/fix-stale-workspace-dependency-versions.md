---
"@equinor/fusion-react-components": patch
"@equinor/fusion-react-ag-grid-person-cell": patch
"@equinor/fusion-react-ag-grid-utils": patch
"@equinor/fusion-react-context-selector": patch
"@equinor/fusion-react-date": patch
"@equinor/fusion-react-errorboundary": patch
"@equinor/fusion-react-hanging-garden": patch
"@equinor/fusion-react-list": patch
"@equinor/fusion-react-markdown": patch
"@equinor/fusion-react-person": patch
"@equinor/fusion-react-ripple": patch
"@equinor/fusion-react-searchable-dropdown": patch
"@equinor/fusion-react-side-sheet": patch
"@equinor/fusion-react-skeleton": patch
"@equinor/fusion-react-stepper": patch
"@equinor/fusion-react-styles": patch
"@equinor/fusion-react-tabs": patch
"@equinor/fusion-react-textarea": patch
"@equinor/fusion-react-utils": patch
---

Fix stale internal `workspace:*` dependency versions in published packages.

Previously published tarballs pinned outdated versions of sibling workspace
packages (for example, `@equinor/fusion-react-person` resolving to an old
`@equinor/fusion-react-utils`, and `@equinor/fusion-react-components` resolving
to an old `@equinor/fusion-react-person`). This happened because `bun pm pack`
substitutes `workspace:*` ranges using the versions recorded in `bun.lock`, but
the lockfile was not refreshed after `changeset version` bumped package
versions, so the lockfile drifted out of sync with the actual package versions.

This release republishes all packages so their `workspace:*` dependencies are
resolved to the correct, current versions. The release workflow now refreshes
and commits `bun.lock` during the version step (`changeset version && bun
install`), preventing this drift from recurring.
