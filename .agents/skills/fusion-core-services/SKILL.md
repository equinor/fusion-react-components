---
name: fusion-core-services
description: 'Guides integrations across Fusion Core service APIs from a single installable skill. USE FOR: service discovery across apps, people, context, roles, notifications, reports, tasks, and other Fusion Core APIs; cross-service integration planning; choosing the right endpoint/model guidance for a workflow. DO NOT USE FOR: modifying Fusion backend source code, non-Fusion APIs, or generic cloud architecture work without a Fusion service integration target.'
license: MIT
compatibility: Works best with a web-fetch tool to read live, public OpenAPI documents
  (`https://{service}.api.fusion.equinor.com/openapi/api-v{version}.json`, no JWT required) as the
  source of truth for exact schema/type names, rather than relying solely on the bundled snapshots.
metadata:
  version: "0.0.3"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - api
    - core-services
    - multi-service
    - experimental
---

# Fusion Core Services

## When to use

Use when the task involves one or more Fusion Core service APIs and the agent needs to identify the right service guidance without requiring separate skill installs.

Typical triggers:
- implement a Fusion API client
- wire a Fusion backend service integration
- figure out which Fusion Core service owns a workflow
- solve a cross-service task such as context plus people, roles plus notifications, or apps plus service messages

## When not to use

- Modifying code inside `fusion-core-services`
- Non-Fusion APIs or generic Microsoft Graph / Power BI work with no Fusion service layer
- Standalone product workflows already covered by another dedicated skill outside Fusion Core services

## Required inputs

- target workflow or user goal
- target consumer shape (`react`, `typescript client`, `csharp httpclient`, `backend service`, or other)
- known service hints, if any
- versioning or authorization expectations when relevant

## Instructions

1. Scope the request first.
- Identify whether the workflow touches one service or multiple.
- If service is ambiguous, use `agents/service-router.md` to map the workflow to likely services before producing implementation guidance.

2. Read only the relevant service references.
- Start with [Combined API surface](references/api-surface.md).
- Then open the matching per-service reference file.
- Pull in the endpoint catalog and model asset for only the services that materially affect the answer.

3. Fetch the live OpenAPI document before trusting exact names or shapes.
- Every Fusion Core service publishes its current OpenAPI document publicly, with no JWT required:
  `https://{service}.api.fusion.equinor.com/openapi/api-v{version}.json` (e.g.
  `https://people.api.fusion.equinor.com/openapi/api-v3.json`,
  `https://context.api.fusion.equinor.com/openapi/api-v1.json`).
- The bundled reference files are a curated index of which services/controllers exist and how to
  approach them — not the source of truth for exact schema/type names, which drift as services
  change. Fetch the live document for the target service(s) and read `components.schemas` for the
  real type names — responses are commonly `Api{Entity}` and request bodies a plain
  `{Verb}{Entity}Request` name, but the live document's exact name always wins over any pattern;
  never invent a `Dto`-suffixed name that isn't actually in `components.schemas`.
- If you cannot fetch the live OpenAPI document (no web-fetch tool or network access), explicitly
  state that limitation, treat bundled references/assets as best-effort, and avoid asserting exact
  schema/type names or required fields.
- If the subdomain isn't already known from the service catalog below, resolve it via Fusion
  service discovery rather than guessing, per the platform-wide rule of never hardcoding service
  addresses.

4. Preserve source-grounded guidance.
- Prefer the live OpenAPI document over the bundled reference's own "suggested model" lists when
  they disagree — the live document is always current, the bundled file may not be.
- Call out any route or model area that still requires direct source confirmation before shipping.

5. Handle capabilities explicitly.
- If a service exposes `OPTIONS` or other access-probe routes, use them to drive capability-aware UI or mutation logic.
- If a service does not expose stable probes, document conservative client behavior and treat `403 Forbidden` as the fallback capability signal.

6. Treat subscriptions as backend-only unless the reference says otherwise.
- The `/subscriptions/...` routes are for application-token event registration and CloudEvent-style change handling, not normal frontend CRUD flows.

7. Return consumer-ready guidance.
- For frontend consumers, return TypeScript-friendly models (named after the real schema, not `Dto`-suffixed) and a minimal client/hook pattern.
- For .NET consumers, return a typed `HttpClient` plan that deserializes directly into the real schema type from the live document (commonly `Api{Entity}`, but use whatever `components.schemas` actually names it) rather than a hand-rolled shadow record, where one is published.
- For cross-service tasks, explain the service sequence and data handoff between services.

## Service catalog

- Apps: [reference](references/fusion-apps.md), [endpoint catalog](assets/fusion-apps-endpoint-catalog.md), [models](assets/fusion-apps-models.ts)
- Bookmarks: [reference](references/fusion-bookmarks.md), [endpoint catalog](assets/fusion-bookmarks-endpoint-catalog.md), [models](assets/fusion-bookmarks-models.ts)
- Context: [reference](references/fusion-context.md), [endpoint catalog](assets/fusion-context-endpoint-catalog.md), [models](assets/fusion-context-models.ts)
- Contract Personnel: [reference](references/fusion-contract-personnel.md), [endpoint catalog](assets/fusion-contract-personnel-endpoint-catalog.md), [models](assets/fusion-contract-personnel-models.ts)
- Mail: [reference](references/fusion-mail.md), [endpoint catalog](assets/fusion-mail-endpoint-catalog.md), [models](assets/fusion-mail-models.ts)
- Notification: [reference](references/fusion-notification.md), [endpoint catalog](assets/fusion-notification-endpoint-catalog.md), [models](assets/fusion-notification-models.ts)
- People: [reference](references/fusion-people.md), [endpoint catalog](assets/fusion-people-endpoint-catalog.md), [models](assets/fusion-people-models.ts)
- Portal Config: [reference](references/fusion-portal-config.md), [endpoint catalog](assets/fusion-portal-config-endpoint-catalog.md), [models](assets/fusion-portal-config-models.ts)
- Reports: [reference](references/fusion-reports.md), [endpoint catalog](assets/fusion-reports-endpoint-catalog.md), [models](assets/fusion-reports-models.ts)
- RolesV2: [reference](references/fusion-roles-v2.md), [endpoint catalog](assets/fusion-roles-v2-endpoint-catalog.md), [models](assets/fusion-roles-v2-models.ts)
- Service Messages: [reference](references/fusion-service-messages.md), [endpoint catalog](assets/fusion-service-messages-endpoint-catalog.md), [models](assets/fusion-service-messages-models.ts)
- Tasks: [reference](references/fusion-tasks.md), [endpoint catalog](assets/fusion-tasks-endpoint-catalog.md), [models](assets/fusion-tasks-models.ts)

## Expected output

Return headings in this order:
1. Scope check
2. Service selection
3. Endpoint mapping
4. Model mapping
5. Consumer implementation plan
6. Integration code sketch
7. Validation and test notes
8. Risks and assumptions

## Safety & constraints

Never:
- invent service ownership, routes, or model fields
- invent a `Dto`-suffixed type name, or any name not actually present in the live OpenAPI
  document's `components.schemas` — use the exact real name, whatever pattern it follows
- answer from generic SaaS/API assumptions when the bundled Fusion references are specific
- treat backend subscription routes as normal frontend interaction flows

Always:
- fetch the live OpenAPI document for the target service(s) before naming a type — the bundled
  reference files can drift out of date, the live document cannot
- keep cross-service reasoning explicit when more than one service is involved
- call out capability-probe behavior when the service exposes `OPTIONS`
- prefer the narrowest set of service references needed for the user’s workflow