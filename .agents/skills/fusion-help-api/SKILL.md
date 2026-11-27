---
name: fusion-help-api
description: 'Guides direct Fusion Help REST API use. USE FOR: fetch/search articles, FAQs and release notes, manage help content via API, auth, request models and automation. DO NOT USE FOR: fhelp (use fusion-help-docs), PageLayout/useHelpCenter wiring (use fusion-help-integration), Help backend changes or non-Help APIs.'
license: MIT
compatibility: Requires authenticated HTTP client with Fusion bearer token. Works with any language or framework that can make REST calls.
metadata:
  version: "0.0.5"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - help-api
    - fusion-help
    - articles
    - release-notes
    - faq
    - search
    - integration
---

# Fusion Help API

Direct REST reading, search and content management; any language/framework with authenticated HTTP client.

## When to use

- Fetch articles, FAQs or release notes; search/suggest Help content.
- Build custom CLI, app integration or admin CRUD/asset automation; explain endpoints, auth and models.

## When not to use

- `fhelp` Markdown sync: use `fusion-help-docs`.
- `PageLayout`/`useHelpCenter` wiring: use `fusion-help-integration`.
- Help backend changes or REST questions unrelated to Help.

## Required inputs

Collect use case (read/manage/search), app key for scoped queries, target environment (`ci`, `fqa`, `tr`, `fprd`), and auth context (interactive user or automation service principal). Ask about auth availability, never token values.

## Safety & constraints

- Articles, FAQs, release notes and search: any authenticated Fusion user. CRUD/assets: app admin, trusted app or `Fusion.Help.FullControl`.
- Global changelog: `Fusion.Help.FullControl` only. Per-app changelog: app admin or `Fusion.Help.FullControl`.
- Confirm destination and operation before remote writes/deletes/uploads; permission is not approval.
- Deleted articles/FAQs/release notes are soft-deleted; slugs cannot be reused.
- `sourceSystem` identifies record creator. Mixing source systems for same slug makes `fhelp` refuse updates unless `--no-validation` is used.
- Test against `ci` before `fprd`. Images must be PNG; API serves processed WebP.
- Never request, expose or hardcode bearer tokens/credentials; use `DefaultAzureCredential` or equivalent.

## Instructions

### 1. Discover the Help API base URL

When resolving base URL, read `references/service-discovery.md` for exact environment URLs and dynamic discovery request. For production tooling, prefer discovery service `key: "help"`; use response `uri`.

### 2. Authentication

All endpoints need valid Azure AD bearer token. When authenticating or writing auth code, read `references/authentication.md` for exact audiences and frontend/backend/CLI samples.

### 3. Authorization levels

Check caller's permissions against Safety & constraints before chosen operation, including changelog exceptions.

### 4. Call the API

Include `?api-version=1.0`. Resources: Articles, FAQs, Release Notes, Assets, Search/Suggest, Changelog.

- When choosing endpoints or OData options, read `references/api-quick-reference.md` for compact matrix/filter/expand/pagination lookup.
- When constructing CRUD, assets, search or changelog requests, read `references/api-endpoints.md` for request/response bodies, OData support and server validation rules.
- When interpreting responses or defining models, read `references/response-models.md` for schemas and paged collections.

### 5. Integration patterns

When code samples are needed, read `references/integration-patterns.md` for React article display, release notes banner, FAQ search, C# or Python automation. Select relevant pattern; do not execute write examples without approval.

## Expected output

Working auth and Help API code, correct URLs/query parameters, response models/OData explanation, admin request bodies when needed, and samples matching language/framework.
