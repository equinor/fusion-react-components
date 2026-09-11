# Changelog

## 0.0.3 - 2026-09-07

### patch

- [#236](https://github.com/equinor/fusion-skills/pull/236) [`0b92e05`](https://github.com/equinor/fusion-skills/commit/0b92e05fe539eccec6b185f78954e554b21f0445) Thanks [@alftore](https://github.com/alftore)! - Prefer live, public OpenAPI documents over static snapshots in the experimental

  `fusion-core-services` skill, and finish removing invented `Dto`-suffixed naming from it.

  - Every Fusion Core service now publishes its current OpenAPI document publicly, with no JWT
    required (`https://{service}.api.fusion.equinor.com/openapi/api-v{version}.json`), following the
    migration off Swashbuckle-generated docs. Added a new instruction step directing the skill to
    fetch this live document and read exact type names from `components.schemas` before naming
    anything, treating the bundled `references/*.md`/`assets/*.ts` snapshots as a curated index of
    what exists rather than the source of truth for exact shapes.
  - Stripped the remaining `Dto` suffix from every suggested type name across all 12 per-service
    reference files (e.g. `ContextEntityDto` → `ContextEntity`, `NewMailRequestDto` →
    `NewMailRequest`), and replaced "DTO"-based prose ("Suggested DTOs", "local DTOs", "DTO records")
    with "local models"/"model records" throughout.
  - Applied the same fix to `contribute/api-skill-template.md` and `api-skill-standards.md` — the
    meta-templates every per-service reference file (and any future one) is generated from — so the
    naming issue and the missing live-document guidance don't reintroduce themselves next time a
    service reference is added.

  Follows up on the `Dto`-naming fix already shipped for `fusion-backend-dev` in a separate PR.

## 0.0.2 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.


  - Drop articles, filler, hedging from SKILL.md activation body

## 0.0.1 - 2026-03-18

### patch

- [#87](https://github.com/equinor/fusion-skills/pull/87) [`62d3098`](https://github.com/equinor/fusion-skills/commit/62d30981a36e29198d009d20e5e7a899451a9d02) Thanks [@alftore](https://github.com/alftore)! - Add a consolidated experimental `fusion-core-services` skill that bundles the Fusion Core API references into a single installable catalog.


  resolves equinor/fusion-core-tasks#791
  resolves equinor/fusion-core-tasks#792
