---
name: fusion-help-integration
description: 'Wires Fusion Help Center into monorepo app pages. USE FOR: help button, useHelpCenter, helpArticles constants and PageLayout openHelpArticle. DO NOT USE FOR: Markdown authoring (use fusion-help-docs), REST calls (use fusion-help-api), @fra/ui changes, non-Fusion-framework apps or apps outside this monorepo.'
license: MIT
compatibility: Requires @equinor/fusion-framework-react-app with help-center subpath export. Requires @fra/ui PageLayout component.
metadata:
  version: "0.0.4"
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

Wire contextual Help Center into monorepo app pages via `PageLayout` help button.

## When to use

- Add help support/button, wire `useHelpCenter`, create/update article constants or open specific article.
- Page uses `PageLayout` without `openHelpArticle`.

## When not to use

- Markdown authoring: use `fusion-help-docs`. Direct REST: use `fusion-help-api`.
- Modifying `@fra/ui` components (`PageLayout`, `PageHeader`, `FusionHelpButton`).
- Non-Fusion-framework apps or apps outside this monorepo.

## Required inputs

Collect app name under `apps/`, target pages (or `"all"` using `PageLayout`), and article slugs. Defaults: derive `{app-name}-{page-kebab}` only with confirmation; release notes `true`; constants `src/constants/helpArticles.ts`.

When inputs are missing, read `assets/follow-up-questions.md` for focused questions.

## Safety & constraints

- Confirm auto-derived slugs before applying; never invent unconfirmed slugs. Values must exactly match published `help-articles.json` slugs per environment via `fhelp`.
- Wrong slug silently fails: sidesheet opens but no article content appears.
- Call `useHelpCenter` only inside component descended from Fusion Framework app shell (`makeComponent` / `renderApp`).
- Do not modify `@fra/ui` or add dependencies; apps already have `@equinor/fusion-framework-react-app`.
- Extend existing wiring, never duplicate; one `useHelpCenter()` call per page.
- Follow app aliases (usually `@/*` to `src/*`), code style and import ordering; use `type` for type-only imports.
- Repository-local workflow instructions govern source-control and validation steps when applicable.

## Instructions

### 1. Check existing help integration

Search target app:

```
apps/{app-name}/src/**/helpArticles.ts
apps/{app-name}/src/**/fusionHelpArticles.ts
```

Also search `useHelpCenter` imports; extend partial integration.

### 2. Determine slug convention

Follow existing constants naming pattern. New apps: prefer `{app-name}-{page-kebab}` to avoid collisions. When checking existing app conventions, read `references/page-wiring.md` for original app matrix and recipe.

### 3. Create or update the constants file

Create `src/constants/helpArticles.ts` (or chosen location):

```typescript
export const FUSION_HELP_ARTICLES = {
    PAGE_NAME: '{app-name}-{page-kebab}',
};
```

Keys: `SCREAMING_SNAKE_CASE` page concepts; values: kebab-case slugs.

### 4. Wire each target page

When wiring pages, read `references/page-wiring.md` for exact imports, hook and JSX recipe. External imports first, then `@fra/*`, `@/*` aliases, relative imports.

Hook inside component body; use `openArticle` and optional `openReleaseNotes`. Pass `openHelpArticle` as callback wrapper `() => openArticle(slug)`, never direct `openArticle` (needs slug). Omit release-notes hook/prop when not requested.

When adapting full examples, read `references/wiring-pattern.md` for canonical page, release-note variants, breadcrumbs/error handling and import groups. When checking props or button behavior, read `references/shared-ui-props.md`: help button requires callback; release button also requires non-collapsed header.

### 5. Verify the integration

1. TypeScript: `pnpm --filter {app-name} exec tsc --noEmit`.
2. Lint: `pnpm --filter {app-name} exec eslint src/`.
3. Visual: info-circle (ⓘ) in header; clicking opens Help sidesheet with matching article.

### 6. Cross-reference with published content

Every constant slug must match published content in target environment. If missing, hand off authoring to `fusion-help-docs`; report slugs needing articles.

## Expected output

Created/updated constants and wired pages, TypeScript result, and missing-article slug list for `fusion-help-docs`.
