# Changelog

## 0.0.2 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress portal-architecture reference

## 0.0.1 - 2026-03-23

### patch

- [#123](https://github.com/equinor/fusion-skills/pull/123) [`aa9fc17`](https://github.com/equinor/fusion-skills/commit/aa9fc1707ca4c95edc15f2ef3068a3175c47670e) - Add fusion-developer-portal skill for Fusion portal shell development


  - Guides scaffolding portals with the Fusion Framework CLI (`ffc portal dev/build/upload`)
  - Documents portal-level module configuration (`FrameworkConfigurator` vs `AppModuleInitiator`)
  - Covers app loading (Apploader component, useApploader hook, custom AppLoader with RxJS)
  - Includes portal routing, chrome (header, context selector), analytics, and telemetry
  - Reference file with full portal architecture patterns from framework cookbooks

  resolves equinor/fusion-core-tasks#752
