## Skills Upgrade

Automated run of `npx skills update` to update agent skills to their latest versions.
**Date:** 2026-04-30 08:54 UTC
**Node version:** 24

## Summary
- Changed / added skills: 4

## Updated Skills
- **fusion-backend-dev**
  <details><summary>CHANGELOG additions for fusion-backend-dev</summary>


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


</details>

- **fusion-mcp**
  <details><summary>CHANGELOG additions for fusion-mcp</summary>

## 0.1.3 - 2026-04-22
### patch
- [#143](https://github.com/equinor/fusion-skills/pull/143) [`3c02e1d`](https://github.com/equinor/fusion-skills/commit/3c02e1d348a4de8ee9a0fd5a088ff18c0019dc2b) Thanks [@alftore](https://github.com/alftore)! - Document backend code tools in the Fusion MCP setup guide.
  - Add `search_backend_code` to retrieval tool examples
  - Add `get_backend_symbol` and `list_backend_projects` in the available backend tooling list

</details>

- **fusion-package-scribe**
  <details><summary>CHANGELOG additions for fusion-package-scribe</summary>


## 0.0.1 - 2026-04-22

### patch

- [#141](https://github.com/equinor/fusion-skills/pull/141) [`e84644f`](https://github.com/equinor/fusion-skills/commit/e84644f868bc8f879823d71b1121e2c5d9844438) - Add new experimental skill for systematic TSDoc and README documentation across TypeScript monorepo packages


  - Orchestrator-based workflow: discover packages, generate TSDoc, rewrite READMEs, review, commit
  - Three agent modes: orchestrator (batch planning), documenter (per-package writing), reviewer (review council)
  - Repo-aware standards discovery with built-in defaults fallback
  - Review council validates intent extraction, code comprehension, user-facing quality, and retrieval fitness
  - Token budget guidance and batch strategy for large monorepo sweeps

  resolves equinor/fusion-core-tasks#702


</details>

- **fusion-research**
  <details><summary>CHANGELOG additions for fusion-research</summary>

## 0.4.0 - 2026-04-22
### minor
- [#143](https://github.com/equinor/fusion-skills/pull/143) [`3c02e1d`](https://github.com/equinor/fusion-skills/commit/3c02e1d348a4de8ee9a0fd5a088ff18c0019dc2b) Thanks [@alftore](https://github.com/alftore)! - Add backend-code routing support to fusion-research.
  - Add backend-code domain classification and agent dispatch guidance
  - Add backend-code research agent for C# and backend service implementation questions
  - Add backend-code query reference with evidence-first search lanes
  - Extend compatibility and MCP suggestions with backend code search support

</details>

