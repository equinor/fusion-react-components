## Skills Upgrade

Automated run of `npx skills update` to update agent skills to their latest versions.
**Date:** 2026-09-11 08:21 UTC
**Node version:** 24

## Summary
- Changed / added skills: 6

## Updated Skills
- **fusion**
  <details><summary>CHANGELOG additions for fusion</summary>

## 0.1.1 - 2026-09-07
### patch
- [#227](https://github.com/equinor/fusion-skills/pull/227) [`596c9c1`](https://github.com/equinor/fusion-skills/commit/596c9c1f679dbfc536f9cd302143e350d3a23f53) - Use version-bounded Microsoft APM references when routing users to missing Fusion skills.

</details>

- **fusion-backend-dev**
  <details><summary>CHANGELOG additions for fusion-backend-dev</summary>

## 0.1.3 - 2026-09-07
### patch
- [#235](https://github.com/equinor/fusion-skills/pull/235) [`1fa9fb4`](https://github.com/equinor/fusion-skills/commit/1fa9fb4aee0259d87ac89528c0c38a9b1cb7aa4a) Thanks [@alftore](https://github.com/alftore)! - Document Fusion's endpoint versioning philosophy in `fusion-backend-dev`'s API contracts
  reference: versioning is per endpoint (not per service), only bumped when an endpoint actually
  needs a breaking change, and a non-breaking option — most commonly adding an optional response
  property — is preferred over introducing a new version at all.
- [#235](https://github.com/equinor/fusion-skills/pull/235) [`1fa9fb4`](https://github.com/equinor/fusion-skills/commit/1fa9fb4aee0259d87ac89528c0c38a9b1cb7aa4a) Thanks [@alftore](https://github.com/alftore)! - Fix `fusion-backend-dev` reference docs using invented `Dto`-suffixed type names
  (`PositionDto`, `ContextDto`, `PersonDto`, `SAPPersonDto`, `MinimalPersonDto`) instead of Fusion's
  actual naming convention.
  - `references/cqrs-reference.md`: rename examples to `Api{Entity}`, and add a naming-convention
    section explaining `Db{Entity}`/`Query{Entity}`/`Api{Entity}` and the optional `Query` layer
    `fusion-core-services` inserts between handler and controller.
  - `references/integration-patterns.md`: rename the Fusion People API example to `ApiPersonV3`
    (matching the real, versioned contract), fix an inconsistent `SAPPersonDto` reference, and label
    the illustrative model shape explicitly as illustrative.
  - `SKILL.md`: fix a stale `fusion-services-develop` cross-reference (no such skill/agent exists;
    the correct escalation target is the `fusion-services-developer` agent).
  Resolves the naming issue reported while validating the skill against
  `equinor/fusion-pss-subsea-catalog`.
- [#235](https://github.com/equinor/fusion-skills/pull/235) [`1fa9fb4`](https://github.com/equinor/fusion-skills/commit/1fa9fb4aee0259d87ac89528c0c38a9b1cb7aa4a) Thanks [@alftore](https://github.com/alftore)! - Link the new fusion-docs backend service guides from the service-development skill and agent.
  - `fusion-backend-dev/SKILL.md`: point to the fusion-docs
    [New Backend Service Checklist](https://docs.fusion.equinor.com/docs/developer/api/new-service-checklist)
    when a user needs to set up or deploy a new standalone backend API, instead of improvising the
    app-registration/roles/database/deployment sequence.
  - `apm/fusion-developer-services` agent workflow: add the same checklist as the first stop when
    working in a new standalone backend repository with no existing conventions to follow.

</details>

- **fusion-code-conventions**
  <details><summary>CHANGELOG additions for fusion-code-conventions</summary>

## 0.1.5 - 2026-09-07
### patch
- [#237](https://github.com/equinor/fusion-skills/pull/237) [`a6cc390`](https://github.com/equinor/fusion-skills/commit/a6cc3908a11b26454a85484d7def5df1b6a5bd5a) Thanks [@alftore](https://github.com/alftore)! - Close backend-convention gaps found while validating `fusion-developer-services` against
  `equinor/fusion-pss-subsea-catalog`:
  - `csharp.conventions.md`: declare `[ProducesResponseType]` for every status code an action can
    actually return (including negative paths); note that XML doc comments on controller actions and
    request/response model properties surface in the generated OpenAPI document's `summary`/
    `description` fields when the project enables XML-comment inclusion (`Microsoft.AspNetCore.OpenApi`/
    Swashbuckle), not just IntelliSense; prefer a small static factory class for enriched
    `ProblemDetails` responses so controller actions stay one-liners.

</details>

- **fusion-core-services**
  <details><summary>CHANGELOG additions for fusion-core-services</summary>

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

</details>

- **fusion-dependency-review**
  <details><summary>CHANGELOG additions for fusion-dependency-review</summary>

## 0.1.5 - 2026-09-07
### patch
- [#238](https://github.com/equinor/fusion-skills/pull/238) [`6ced569`](https://github.com/equinor/fusion-skills/commit/6ced569541a5474b34812d88c5b019397d328f78) - Separate dependency compatibility, evidence confidence, and mechanical merge readiness.
  - Allow well-researched major updates to receive high confidence
  - Keep pending checks and approval from incorrectly forcing a hold verdict
  - Add explicit readiness states to review outputs and templates

</details>

- **fusion-developer-app**
  <details><summary>CHANGELOG additions for fusion-developer-app</summary>

## 0.4.1 - 2026-09-07
### patch
- [#227](https://github.com/equinor/fusion-skills/pull/227) [`596c9c1`](https://github.com/equinor/fusion-skills/commit/596c9c1f679dbfc536f9cd302143e350d3a23f53) - Install the code conventions dependency through Microsoft APM.

</details>

