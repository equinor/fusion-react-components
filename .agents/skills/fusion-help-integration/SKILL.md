---
name: fusion-help-integration
description: 'Wires Fusion Help Center into app pages — creates article slug constants, adds useHelpCenter hook, and connects PageLayout props so users can open contextual help articles. USE FOR: add help button to page, wire useHelpCenter, create helpArticles constants, integrate Fusion Help in app, connect PageLayout to help center, add openHelpArticle to page. DO NOT USE FOR: authoring markdown help articles (use fusion-help-docs), direct Help REST API calls (use fusion-help-api), modifying @fra/ui shared components.'
license: MIT
compatibility: Requires @equinor/fusion-framework-react-app with help-center subpath export. Requires @fra/ui PageLayout component.
metadata:
  version: "0.0.2"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - help-center
    - useHelpCenter
    - page-layout
    - frontend-integration
    - fusion-help
---

# Fusion Help Integration

Wire the Fusion Help Center into app pages so users can open contextual help articles via the PageLayout help button.

## When to use

- Add help button to a page
- Wire `useHelpCenter` into a page component
- Create/update help articles constants file
- Connect `PageLayout` to Fusion Help Center
- Page uses `PageLayout` without `openHelpArticle`
- Add help support to an app
- Open a specific help article from a page

## When not to use

- Authoring markdown help articles → `fusion-help-docs`
- Direct REST API calls to Help service → `fusion-help-api`
- Modifying `@fra/ui` shared components (`PageLayout`, `PageHeader`, `FusionHelpButton`)
- Non-Fusion-framework apps or apps outside this monorepo

## Required inputs

Collect before making changes:

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| **App name** | Yes | — | The app directory name under `apps/` (e.g., `fra-app-management`) |
| **Target pages** | Yes | — | Which page(s) to wire up, or `"all"` for every page using `PageLayout` |
| **Article slugs** | Yes | Auto-derive | Slug strings for each page. If not provided, derive as `{app-name}-{page-kebab}` |
| **Include release notes** | No | `true` | Whether to also pass `openReleaseNotes` to `PageLayout` |
| **Constants file location** | No | `src/constants/helpArticles.ts` | Path for the `FUSION_HELP_ARTICLES` object |

If article slugs are auto-derived, confirm with user before applying — slugs must match articles published via `fhelp`.

## Instructions

### 1. Check existing help integration

Search target app for existing help wiring:

```
apps/{app-name}/src/**/helpArticles.ts
apps/{app-name}/src/**/fusionHelpArticles.ts
```

Also search for `useHelpCenter` imports. If app already has partial integration, extend rather than duplicate.

### 2. Determine slug convention

Check if app already has a constants file with slugs:

- **Has existing slugs** → follow its naming pattern
- **No existing slugs** → use `{app-name}-{page-kebab}` convention

Reference existing conventions:

| App | Convention | Example |
|-----|-----------|---------|
| `fra-access-manager` | `{app-name}-{page-kebab}` | `fra-access-manager-access-groups` |
| `fra-app-management` | Unprefixed page name | `overview`, `requests` |
| `personnel-allocation` | `{app-name}-{page-kebab}` | `personnel-allocation-overview` |

Prefer prefixed convention for new apps — avoids slug collisions across apps.

### 3. Create or update the constants file

Create `src/constants/helpArticles.ts` (or the app's chosen location):

```typescript
export const FUSION_HELP_ARTICLES = {
    PAGE_NAME: '{app-name}-{page-kebab}',
};
```

Keys are `SCREAMING_SNAKE_CASE` matching the page concept. Values are kebab-case slug strings.

See [references/wiring-pattern.md](references/wiring-pattern.md) for the full canonical pattern with real examples.

### 4. Wire each target page

For each page component that uses `PageLayout`:

**a. Add imports** (externals first, then `@fra/*`, then `@/*` aliases, then relative):

```typescript
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';

import { PageLayout } from '@fra/ui';

import { FUSION_HELP_ARTICLES } from '@/constants/helpArticles';
```

**b. Destructure the hook** inside the component body:

```typescript
const { openArticle, openReleaseNotes } = useHelpCenter();
```

If release notes not needed, destructure only `{ openArticle }`.

**c. Pass props to `PageLayout`**:

```tsx
<PageLayout
    title="Page Title"
    openHelpArticle={() => openArticle(FUSION_HELP_ARTICLES.PAGE_NAME)}
    openReleaseNotes={openReleaseNotes}
>
```

**Important**: `openHelpArticle` must be a **callback wrapper** `() => openArticle(slug)`, not a direct reference — `openArticle` requires the slug argument.

### 5. Verify the integration

After wiring:

1. Run TypeScript check: `pnpm --filter {app-name} exec tsc --noEmit`
2. Check lint: `pnpm --filter {app-name} exec eslint src/`
3. Visual check: page header shows info-circle (ⓘ) icon. Clicking opens Fusion Help sidesheet.

### 6. Cross-reference with published content

Each slug in `FUSION_HELP_ARTICLES` must correspond to a published article. If articles don't exist:

- Point to `fusion-help-docs` for authoring
- Slug in constants must exactly match `slug` field in `help-articles.json`
- Articles are published per-environment via `fhelp`

## Expected output

- Constants file created/updated with article slug mappings
- Target page(s) wired with `useHelpCenter` + `PageLayout` props
- TypeScript compilation passes
- List of slugs needing corresponding help articles (for handoff to `fusion-help-docs`)

## Safety & constraints

- **Never invent slug names without confirmation** — slugs must match published articles
- **Don't modify `@fra/ui` components** — `PageLayout`, `PageHeader`, `FusionHelpButton` already support help props
- **Don't add new dependencies** — `@equinor/fusion-framework-react-app` is already in every app
- **Follow app's import alias convention** — most apps use `@/*` → `src/*`
- **Respect existing code style** — use `type` for type-only imports, maintain import group ordering
- **Don't duplicate help wiring** — if page already has `useHelpCenter`, extend rather than re-add
- **Confirm auto-derived slugs** before applying — wrong slug silently fails (no article shown)
