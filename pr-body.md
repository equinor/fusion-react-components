## Skills Upgrade

Automated run of `npx skills update` to update agent skills to their latest versions.
**Date:** 2026-05-20 09:17 UTC
**Node version:** 24

## Summary
- Changed / added skills: 20

## Updated Skills
- **fusion-backend-dev**
  <details><summary>CHANGELOG additions for fusion-backend-dev</summary>

## 0.1.1 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and all references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress authorization-patterns, validation-patterns, integration-patterns, async-patterns, cqrs-reference, api-contracts references

</details>

- **fusion-code-conventions**
  <details><summary>CHANGELOG additions for fusion-code-conventions</summary>

## 0.1.3 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and all convention references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress typescript, react, csharp, markdown convention references

</details>

- **fusion-core-services**
  <details><summary>CHANGELOG additions for fusion-core-services</summary>

## 0.0.2 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.
  - Drop articles, filler, hedging from SKILL.md activation body

</details>

- **fusion-dependency-review**
  <details><summary>CHANGELOG additions for fusion-dependency-review</summary>

## 0.1.4 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md, agents, and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress research-advisor and verdict-advisor agent files
  - Compress instructions and questions references

</details>

- **fusion-developer-app**
  <details><summary>CHANGELOG additions for fusion-developer-app</summary>

## 0.3.0 - 2026-05-07
### minor
- [#860](https://github.com/equinor/fusion-skills/pull/860) [`96f1768`](https://github.com/equinor/fusion-skills/commit/96f1768e3f1cdf988caa4a398776d8753b4cb77f) - Add design agent to fusion-developer-app
  - Add `agents/design.md` helper agent covering Fusion Portal shell composition, layout zone nesting, side panel usage (SideSheet), empty/loading state patterns, and structural anti-patterns
  - Update `SKILL.md` Step 4 to reference `design.md` for page/view structure review and `styling.md` for component-level checks
  - Update helper agents section to include `design.md` with clear scope boundary vs `styling.md`
  Agent references `equinor-design-system` system skill for authoritative token and layout zone ground truth, and delegates component-level EDS checks to `agents/styling.md`.
  resolves equinor/fusion-core-tasks#860
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and all references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress all using-*.md, configure-*.md, styled-components, styling-with-eds, project-structure references
## 0.2.0 - 2026-05-05
### minor
- [#753](https://github.com/equinor/fusion-skills/pull/753) [`88878fe`](https://github.com/equinor/fusion-skills/commit/88878fe1c7d4fbfdd6b49139f3718e68d8e5aad7) - Add custom Fusion Framework module authoring reference
  - Add `references/using-custom-modules.md` covering the IModule contract, wiring into `config.ts`, accessing via `useAppModule`, module lifecycle, file structure, and common pitfalls (naming conflicts, outside-React access, un-awaited config)
  - Update `SKILL.md` Step 6 module table with a `using-custom-modules.md` entry
  - Add custom-module-related activation triggers
  resolves equinor/fusion-core-tasks#753
- [#160](https://github.com/equinor/fusion-skills/pull/160) [`0428056`](https://github.com/equinor/fusion-skills/commit/042805616fba13256265b1622c0cdd344f59197a) - Add Fusion Framework people service reference
  - Add `references/using-people-service.md` covering the preferred `azureId`-only integration pattern, picker components, `PersonCell` for AG Grid, and guidance on what NOT to do (manual API calls, caching PersonInfo)
  - Update `SKILL.md` Step 6 module table with a `using-people-service.md` entry
  - Add people-related activation triggers to the skill description
  resolves equinor/fusion-core-tasks#748
- [#858](https://github.com/equinor/fusion-skills/pull/858) [`50bfdf6`](https://github.com/equinor/fusion-skills/commit/50bfdf6451059951e94e8ec4b69fdc33e77d4c7a) - Add person component training wheels to fusion-developer-app
  - Expand `references/using-fusion-react-components.md` with `PersonCard`, `PersonListItem`, and `PersonCell` (AG Grid) usage examples
  - Add a decision guide table covering all person components and their intended use cases
  - Add new `agents/person-components.md` helper agent covering component selection, the custom DOM event pattern, `PersonCell` valueGetter setup, and common pitfalls
  - Update `SKILL.md` helper agents section and Step 6 module table to reference the new agent
  resolves equinor/fusion-core-tasks#858
- add companion-skill metadata for `fusion-research-framework`

</details>

- **fusion-developer-portal**
  <details><summary>CHANGELOG additions for fusion-developer-portal</summary>

## 0.0.2 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress portal-architecture reference

</details>

- **fusion-github-review-resolution**
  <details><summary>CHANGELOG additions for fusion-github-review-resolution</summary>

## 0.1.7 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.
  - Drop articles, filler, hedging from SKILL.md activation body

</details>

- **fusion-help-api**
  <details><summary>CHANGELOG additions for fusion-help-api</summary>

## 0.0.3 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress integration-patterns reference

</details>

- **fusion-help-docs**
  <details><summary>CHANGELOG additions for fusion-help-docs</summary>

## 0.0.2 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress cli-reference reference

</details>

- **fusion-help-integration**
  <details><summary>CHANGELOG additions for fusion-help-integration</summary>

## 0.0.2 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress wiring-pattern and shared-ui-props references

</details>

- **fusion-issue-authoring**
  <details><summary>CHANGELOG additions for fusion-issue-authoring</summary>

## 0.3.5 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress instructions, mcp-server, questions references
## 0.3.4 - 2026-05-04
### patch
- [#153](https://github.com/equinor/fusion-skills/pull/153) [`3911da5`](https://github.com/equinor/fusion-skills/commit/3911da5922ab0b392d6c9b93a284ce0746870364) - Clarify sub_issue_id requires object ID, not issue number
  - Promote the ID vs number distinction to a prominent warning block above the example
  - Add a `gh api` command showing how to retrieve the object ID
  - Add a troubleshooting table covering 404, invalid input, and silent-failure modes
  - Clarify that `after_id`/`before_id` in reprioritize are also object IDs
  - Add sub-issue linking activation cues to SKILL.md triggers
  resolves equinor/fusion-skills#79
- [#156](https://github.com/equinor/fusion-skills/pull/156) [`3ed5296`](https://github.com/equinor/fusion-skills/commit/3ed52962820549c21ddbec57df01273c5c930749) - Strengthen devil's-advocate agent for task-planning context
  Expands the devil's advocate with:
  - Auto-escalation to interrogator mode when a task-planning pass surfaces two or more architecture-ambiguity signals (no user trigger required)
  - Extended Task concerns in moderate mode: premature decomposition, implicit cross-task contracts, and tasks that hide unresolved architecture assumptions
  - New "Task-planning context" section in interrogator mode with four targeted decision branches: premature decomposition, implicit contracts, sequencing pressure, and hidden assumptions
  resolves equinor/fusion-skills#132

</details>

- **fusion-issue-solving**
  <details><summary>CHANGELOG additions for fusion-issue-solving</summary>

## 0.1.7 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.
  - Drop articles, filler, hedging from SKILL.md activation body

</details>

- **fusion-issue-task-planning**
  <details><summary>CHANGELOG additions for fusion-issue-task-planning</summary>

## 0.1.6 - 2026-05-04
### patch
- [#156](https://github.com/equinor/fusion-skills/pull/156) [`3ed5296`](https://github.com/equinor/fusion-skills/commit/3ed52962820549c21ddbec57df01273c5c930749) - Add explicit devil's-advocate review step before task draft generation
  Inserts a new step 6 that inspects the proposed task set for architecture-ambiguity signals before any drafts are generated. When two or more signals are present (unresolved design decisions, implicit backend/frontend contracts, vague sequencing, contested ownership), the workflow automatically routes to interrogator mode without requiring a user trigger. In draft-only mode with unresolved ambiguities, an `⚠ Ambiguity warning` block is emitted at the top of the plan preview.
  resolves equinor/fusion-skills#132

</details>

- **fusion-mcp**
  <details><summary>CHANGELOG additions for fusion-mcp</summary>

## 1.0.1 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress mcp-call-snippets and vscode-mcp-config references
- [#168](https://github.com/equinor/fusion-skills/pull/168) [`6c56986`](https://github.com/equinor/fusion-skills/commit/6c56986a322214a89bddb6e549c4cdf8622a9025) - Fix diagnostic issues in fusion-mcp SKILL.md
  - Resolve contradiction between "only recommended path" and exception clause for self-hosted alternatives
  - Replace ambiguous "minimal validation checklist" with explicit three-step validation criteria
  - Restructure troubleshooting from flat bullets into numbered Check/Fix substeps to reduce cognitive load
  - Add coverage for users without an Equinor Entra account
## 1.0.0 - 2026-05-04
### major
- [#150](https://github.com/equinor/fusion-skills/pull/150) [`7f7c2d4`](https://github.com/equinor/fusion-skills/commit/7f7c2d480b8a562ddf6e5028a877b13a90bdb11a) - Update skill to reflect the new `equinor/fusion-mcp` server
  - Replace all references to the old `fusion-poc-mcp` PoC server and image
  - Promote the hosted production server (`https://mcp.api.fusion.equinor.com/mcp`) as the only recommended setup path; remove local Docker/GHCR guidance for end users
  - Update VS Code config to use HTTP + OAuth (Microsoft Entra) instead of Docker `stdio` with API keys
  - Rewrite `references/vscode-mcp-config.md` with one-click install link and manual OAuth config template
  - Update tool inventory to match the new server: `search`, `search_framework`, `search_docs`, `search_backend_code`, `search_eds`, `search_indexes`
  - Rewrite `references/mcp-call-snippets.md` with accurate per-tool parameter tables sourced from server code
  - Remove `references/local-http-quickstart.md` (local setup not promoted to end users)
  - Update troubleshooting to cover hosted-server failure modes (Entra auth, `401`, empty tool list)
  Resolves equinor/fusion-skills#149

</details>

- **fusion-package-scribe**
  <details><summary>CHANGELOG additions for fusion-package-scribe</summary>

## 0.0.2 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress batch-strategy, readme-template, tsdoc-checklist references

</details>

- **fusion-research**
  <details><summary>CHANGELOG additions for fusion-research</summary>

## 0.4.1 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to references.
  - Compress backend-code.query and framework.query references

</details>

- **fusion-rule-author**
  <details><summary>CHANGELOG additions for fusion-rule-author</summary>

## 0.1.1 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.
  - Drop articles, filler, hedging from SKILL.md activation body

</details>

- **fusion-rules**
  <details><summary>CHANGELOG additions for fusion-rules</summary>

## 0.1.1 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.
  - Drop articles, filler, hedging from SKILL.md activation body

</details>

- **fusion-skill-authoring**
  <details><summary>CHANGELOG additions for fusion-skill-authoring</summary>

## 0.3.4 - 2026-05-07
### patch
- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.
  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress skill-authoring-platform-references reference

</details>

- **fusion-skills**
  _No changelog updates found_

