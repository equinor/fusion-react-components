---
name: fusion-core-services
description: 'Guides existing Fusion Core API integrations. USE FOR: service discovery, endpoint and model selection for clients and cross-service workflows. DO NOT USE FOR: backend code changes (use fusion-developer-service), non-Fusion APIs or generic cloud architecture.'
license: MIT
compatibility: Works best with a web-fetch tool to read live, public OpenAPI documents
  (`https://{service}.api.fusion.equinor.com/openapi/{document}.json`, no JWT required) as the
  source of truth for exact schema/type names, rather than relying solely on the bundled snapshots.
metadata:
  version: "0.0.6"
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

Existing Fusion Core API integrations: API clients, backend integrations, service ownership, cross-service workflows (context/people, roles/notifications, apps/service messages). Select relevant guidance without separate service-skill installs.

## When not to use

- Modifying code inside `fusion-core-services`
- Non-Fusion APIs or generic Microsoft Graph / Power BI without Fusion service layer
- Standalone product workflows covered by another dedicated skill

## Required inputs

- Workflow/user goal
- Consumer shape (`react`, `typescript client`, `csharp httpclient`, `backend service`, or other)
- Known service hints
- Versioning/authorization expectations when relevant

## Safety & constraints

- Never invent service ownership, routes, fields or schema names, including `Dto`-suffixed names absent from live `components.schemas`.
- Fetch target services' live OpenAPI before asserting exact types/required fields; live schema wins over bundled snapshots and naming patterns.
- Without fetch capability/network, disclose limitation, use bundled guidance as best-effort, and avoid exact schema/required-field claims.
- Unknown subdomains require Fusion service discovery, never guessed/hardcoded addresses.
- Use specific Fusion references, not generic SaaS assumptions. Flag routes/models needing source confirmation before shipping.
- `/subscriptions/...` requires application tokens for backend CloudEvent-style changes, not frontend CRUD, unless service reference explicitly says otherwise.

## Instructions

1. Scope one-service versus cross-service workflow. If ownership is ambiguous, read and apply `agents/service-router.md` as Markdown instructions to map services before implementation guidance.

2. Read narrowly. For unresolved ownership or cross-service sequencing, read `references/api-surface.md` for combined API surface/patterns. Known-service requests can skip it and read matching catalog reference below. For route details, read only matching endpoint catalog; for model/field/code output, read only matching model asset. All are directly linked below; relevance alone does not require both assets.

3. Fetch live OpenAPI for each selected service/version. Public documents need no JWT:
   `https://{service}.api.fusion.equinor.com/openapi/{document}.json`. Document names include
   `api-v{version}`, `api-beta-v{version}` and date-based previews such as `2020-06-30-Preview`;
   discover published names rather than guessing. Examples:
   `https://people.api.fusion.equinor.com/openapi/api-v3.json`,
   `https://context.api.fusion.equinor.com/openapi/api-v1.json`.
   Read `components.schemas`. Responses commonly use `Api{Entity}`, requests `{Verb}{Entity}Request`; exact live name always wins. Bundled references index services/controllers and approaches, not authoritative names/shapes. Apply fetch/discovery failure rules above.

4. Ground guidance in sources. Live OpenAPI overrides bundled "suggested model" lists on disagreement. Call out route/model areas still needing direct source confirmation before shipping.

5. Handle capabilities. Use `OPTIONS` or access probes for capability-aware UI/mutations when exposed. Without stable probes, document conservative behavior and use `403 Forbidden` as fallback capability signal.

6. Keep subscriptions backend-only unless service reference says otherwise; application-token registration/change handling is not normal frontend interaction.

7. Return consumer-ready guidance:
   - Frontend: TypeScript-friendly models named after real schema, not `Dto`-suffixed, plus minimal client/hook pattern.
   - .NET: typed `HttpClient` deserializing published real schema type directly, not hand-rolled shadow record (commonly `Api{Entity}`, but exact `components.schemas` name wins).
   - Cross-service: explicit sequence and data handoff.

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
