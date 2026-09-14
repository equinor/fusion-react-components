# Changelog

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

## 0.1.2 - 2026-05-29

### patch

- [#176](https://github.com/equinor/fusion-skills/pull/176) [`7da00f3`](https://github.com/equinor/fusion-skills/commit/7da00f300c8a24d6fc02fba800179c4155101fad) Thanks [@alftore](https://github.com/alftore)! - Add fusion-devtools to skill dependencies

## 0.1.1 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and all references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress authorization-patterns, validation-patterns, integration-patterns, async-patterns, cqrs-reference, api-contracts references

## 0.1.0 - 2026-04-22

### minor

- [#143](https://github.com/equinor/fusion-skills/pull/143) [`3c02e1d`](https://github.com/equinor/fusion-skills/commit/3c02e1d348a4de8ee9a0fd5a088ff18c0019dc2b) Thanks [@alftore](https://github.com/alftore)! - Add new shared skill for consuming and understanding Fusion backend services


  - Comprehensive references on API contracts, versioning, and error handling
  - Authorization patterns covering Azure AD, RBAC, and error scenarios
  - Validation layer patterns, error codes, and retry strategies
  - Async patterns for events, webhooks, polling, and idempotent processing
  - Integration patterns for cross-service calls, resilience, and caching
  - CQRS reference guide for command/query patterns and handlers
  - Follow-up questions asset for clarifying ambiguous requests
  - Integrates with fusion-research skill for code discovery via MCP
  - Published as active skill; suitable for shared consumption across teams

  Used by backend API consumption, service integration, and backend contract understanding workflows.
