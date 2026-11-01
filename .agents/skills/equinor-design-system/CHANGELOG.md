# Changelog

## 0.1.1 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten EDS lookup description while retaining token and Portal layout cues, subordinate no-workflow scope and React props/API research exclusions.


  resolves equinor/fusion-core-tasks#2672

## 0.1.0 - 2026-05-05

### minor

- [#859](https://github.com/equinor/fusion-skills/pull/859) [`cbd9e9d`](https://github.com/equinor/fusion-skills/commit/cbd9e9dd561a8f4eff9ca78ad50a9943d735a214) - Add equinor-design-system system skill


  New `.system` subordinate skill encoding authoritative EDS design rules for agents:
  - Color tokens (interactive, semantic, text, surface) with brand constraints
  - Typography variant hierarchy and usage rules
  - Spacing token reference (`--eds-spacing-horizontal-<size>` / `--eds-spacing-vertical-<size>`)
  - Elevation: no CSS vars in EDS v2; guidance to use `Paper` component or JS token import
  - Icon usage rules via `@equinor/eds-icons` + `<Icon data={...} />` (accessibility: `title` required)
  - Fusion Portal three-zone page layout conventions, empty/loading state patterns

  Consumed by other skills and agents as a ground-truth lookup reference, not as a standalone workflow.

  resolves equinor/fusion-core-tasks#859
