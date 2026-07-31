## Skills Upgrade

Automated run of `npx skills update` to update agent skills to their latest versions.
**Date:** 2026-07-31 09:06 UTC
**Node version:** 24

## Summary
- Changed / added skills: 1

## Updated Skills
- **fusion-design**
  <details><summary>CHANGELOG additions for fusion-design</summary>

## 0.1.2 - 2026-07-23
### patch
- [#198](https://github.com/equinor/fusion-skills/pull/198) [`2ab8e00`](https://github.com/equinor/fusion-skills/commit/2ab8e008c4d38a50df481f115fa1a7d644bc071e) - Add action and layout references; fix typography and table-width guidance
  - Add `references/actions.md`: action bar (experimental), destructive-action `Dialog` structure, and button placement rules
  - Add `references/layout-centered-content.md`: centered-content layout rules for form- and reading-heavy pages
  - `references/eds-typography.md`: document the grouped-variant trap — `cell_header`/`cell_text` require `group="table"` (passes typecheck but crashes at runtime without it); prefer group-free quick variants
  - `references/layout.md`: data tables and lists must fill the full content width (`width: 100%`) in the full-width pattern
  - `SKILL.md`: add `actions.md` to the references table
  - `SKILL.md`: add a "Non-negotiable invariants" section so agents honour "all text uses `<Typography>`" and "all spacing uses EDS spacing variables" from the skill entry point, before reading references
- [#198](https://github.com/equinor/fusion-skills/pull/198) [`2ab8e00`](https://github.com/equinor/fusion-skills/commit/2ab8e008c4d38a50df481f115fa1a7d644bc071e) - Add Fusion design navigation/layout/spacing references
  - Add `references/navigation-sidemenu.md` with sidemenu structure, hierarchy, and breadcrumb rules
  - Add `references/navigation-tabs.md` with tab navigation rules
  - Add `references/layout.md` with content area layout patterns
  - Add `references/spacing.md` with EDS spacing token guidance
  - Update `SKILL.md` reference table to include the new references
- [#198](https://github.com/equinor/fusion-skills/pull/198) [`2ab8e00`](https://github.com/equinor/fusion-skills/commit/2ab8e008c4d38a50df481f115fa1a7d644bc071e) - Add empty-states, error-messages, and contextual-help references (including the Tooltip double-tooltip guidance).

</details>

