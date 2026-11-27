---
name: fusion-developer-portal
description: 'Guides Fusion portal shells. USE FOR: scaffolding, portal.manifest.ts, modules, app loading and routing, header and context selector, analytics, ffc portal dev and deployment. DO NOT USE FOR: app features (use fusion-developer-app), backend changes, Help Center integration (use fusion-help-integration) or skill authoring.'
license: MIT
compatibility: Requires @equinor/fusion-framework-cli for portal scaffolding and dev server. Requires @equinor/fusion-framework and @equinor/fusion-framework-react for portal runtime.
metadata:
  version: "0.0.4"
  status: active
  owner: "@equinor/fusion-core"
  skills:
    - fusion-research
    - fusion-code-conventions
  tags:
    - fusion-portal
    - portal-development
    - app-loader
    - portal-shell
    - micro-frontend
    - fusion-framework-cli
    - portal-manifest
    - context-selector
    - portal-routing
  mcp:
    suggested:
      - fusion
---

# Fusion Developer Portal

Custom Fusion portal shells host apps inside shared header, context selector, navigation.

## When to use

- Scaffold new Fusion portal
- `portal.manifest.ts` or `ffc portal dev` questions
- Configure portal modules, analytics and telemetry (navigation, services, app module)
- Build custom app loader or portal shell
- Add portal-level routing (`/apps/:appKey/*`)
- `Apploader` component or `useApploader` hook for embedding apps
- Wire up portal header, context selector, or bookmark side sheet
- Understand how portals load/initialize Fusion apps at runtime
- Portal deployment (`ffc portal build`, `ffc portal upload`)

## When not to use

- App-level feature development → `fusion-developer-app`
- Backend service changes → separate repo
- Fusion Help Center integration → `fusion-help-integration`
- Skill authoring → `fusion-skill-authoring`
- Issue authoring → `fusion-issue-authoring`

## Required inputs

### Mandatory

- Task: scaffold, feature, module configuration, or architecture
- Portal context: new or existing

### Conditional

- Portal name/ID when scaffolding
- MSAL client ID and service discovery URL when configuring auth
- Specific modules to enable (analytics, telemetry, bookmarks, feature flags, AG Grid)
- Whether the portal needs a custom app loader or the default `Apploader` suffices

## Safety & constraints

- **MSAL is portal-level** — never configure auth in apps; hoisted from portal.
- **Don't invent portal APIs** — use APIs confirmed by MCP or documented references; label unconfirmed guidance as fallback.
- **`Apploader` is experimental** — always mention routing/context limitations for app embedding; simple PowerBI/PowerApps views suit it best.
- **No secrets in source** — MSAL client IDs come from environment variables, not hardcoded. Never paste tokens into commands; use `az login` or `FUSION_TOKEN` env var for CI.
- **Don't modify the production Fusion portal** — custom portal development only.
- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Use conventional commits unless repository-local conventions differ; defer validation, changesets, PRs and branch-refresh rules to local workflow instructions. Obtain explicit approval before upload, tag or source-control mutations.

## Instructions

### Step 1 — Classify the portal task

Select applicable steps: scaffold (2), modules (3), loading/routing (4), chrome (5), analytics/telemetry (6), build/deploy (7). Validate changes in step 8.

With Fusion MCP, prefer `mcp_fusion_search_framework` queries `"portal manifest definePortalManifest ffc portal"` or `"createFrameworkProvider PortalModuleInitiator portal configure"` for latest APIs. Label guidance not confirmed by MCP as fallback.

### Step 2 — Scaffold a new portal

When scaffolding, read `references/portal-scaffold.md` for CLI installation, manifest, optional schema, entry file and dev commands. Read “Portal entry point” and “Portal manifest” in `references/portal-architecture.md` for runtime setup.

### Step 3 — Configure portal modules

When configuring modules, read `references/portal-modules.md` for enablement example and `references/portal-architecture.md` “Module configuration” for full configuration and `portal-analytics` cookbook pattern. Use `FrameworkConfigurator`, not `AppModuleInitiator`; portal modules and MSAL/auth are hoisted to child apps.

### Step 4 — App loading and routing

When embedding/routing apps, read `references/portal-loading.md` for simple embed versus custom loader and navigation example. Read `references/portal-architecture.md` “Portal routing”, “Custom app loader”, “Apploader component (simple embed)” and “App initialization lifecycle” as applicable for runtime patterns. Route `/apps/:appKey/*` to loader; handle loading/errors and unsubscribe on cleanup. Apply experimental embedding warning before recommending `Apploader`.

### Step 5 — Portal chrome

Build shell-level header (Fusion logo, context selector, bookmarks, person settings), context selector (`useCurrentContext` or `useContextSelector`), bookmark side sheet toggled through navigation, and app switching navigation. Apps receive header from shell; don't build their own.

For built-in dev shell, environment settings or URL/context synchronization, read “Dev portal architecture” in `references/portal-architecture.md`; local dev portal is not production deployment.

### Step 6 — Analytics and telemetry

When adding lifecycle analytics, read `references/portal-analytics.md` for adapters and app-load/select collectors. For OpenTelemetry / Application Insights, read “Module configuration” in `references/portal-architecture.md`.

### Step 7 — Build and deploy

When building/deploying, read `references/portal-deployment.md` for build/upload/tag commands and auth. Apply approval/secrets gates above before upload/tag. For manifest/schema CLI commands, read “CLI commands” in `references/portal-architecture.md`.

### Step 8 — Validate

1. `ffc portal dev` starts without errors
2. Apps load at `/apps/:appKey`
3. Context selector and header render properly
4. TypeScript compiles with no errors
5. Analytics events fire on app load/select (if enabled)

## Expected output

- Working shell with app loading, routing, chrome
- Portal module configuration using correct `FrameworkConfigurator`
- Loading/error states handled for app initialization
- Brief changes summary

## Helper agents

Same companion infrastructure as `fusion-developer-app`:

- **`fusion-research`** — source-backed Fusion ecosystem research when portal behavior is uncertain
- **`fusion-code-conventions`** — naming, TSDoc, and code style checks

When Fusion MCP is available, prefer `mcp_fusion_search_framework` for portal-specific lookups.

When investigating architecture or uncertain APIs, read “MCP query examples” and “Source references” in `references/portal-architecture.md` for verified source lookup targets.
