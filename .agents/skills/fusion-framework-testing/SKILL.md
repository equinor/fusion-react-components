---
name: fusion-framework-testing
description: 'USE FOR: Fusion React Vitest/Browser Mode tests, vitest.config.ts, render fixtures, failing suites, Playwright journeys, visual baselines. DO NOT USE FOR: module mock state (fusion-framework-mocking), dev-server API mocks (fusion-developer-app), non-Fusion or backend tests.'
license: MIT
compatibility: Requires a Fusion Framework React app. Rendering helpers need vitest, playwright, @vitest/browser-playwright, vitest-browser-react, and @equinor/fusion-framework-vitest-plugin-react-app as dev dependencies, plus `playwright install chromium`. React, React DOM, RxJS, and Vite are peer dependencies a Fusion app normally already provides.
metadata:
  version: "0.2.3"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-framework-mocking
  tags:
    - fusion-framework
    - testing
    - vitest
    - react
    - browser-mode
    - playwright
    - e2e
  mcp:
    suggested:
      - fusion
---

# Fusion Framework Testing

## When to use

Write/run Fusion Framework React hook, component, route or app tests; set up or diagnose
Vitest/Browser Mode, fixtures, migration from Testing Library/jsdom, Playwright journeys and
visual evidence. Includes `vitest.config.ts` and imports of
`@equinor/fusion-framework-vitest-plugin-react-app` or its `/test`, `/config` sub-paths.

## When not to use

Module state (auth/context/feature flags/HTTP): `fusion-framework-mocking`.
`dev-server.config.ts` API mocks/proxies for `ffc app dev`: `fusion-developer-app`, not test setup.
Not non-Fusion suites or backend tests.

## Required inputs

- Subject: pure function, hook, component, route or app; existing `vitest.config.ts` setup.
- When relevant: user/context/HTTP state (hand off to `fusion-framework-mocking`), shared fixture needs.

## Safety & constraints

- No real credentials, tenants or live backend services in tests.
- Await every Fusion render/hook helper (`render`, `renderHook`, `renderAppComponent`,
  `renderAppHook`) before claiming rendered correctness.
- Unmatched HTTP reaches real network; answer every expected offline request and reject unexpected ones.
- Never commit locally generated Playwright screenshot baselines or add `toHaveScreenshot` pixel gates.
  Behavior assertions decide pass/fail; screenshots are reviewed CI evidence, not visual approval.
- Never replace DOM-emulation gaps with untested polyfills/component swaps and call tests passing.
- Cite real exports/APIs; invent no Fusion test helpers or undocumented Vitest/Playwright options.
- Follow repo dependency approval and existing package manager/setup; examples are not install permission.
  Missing required mocking companion: report and stop that branch, not guessed seeding APIs.
- Keep `server.warmup.clientFiles` aligned with `test.include` when test files move.

## Instructions

### Step 1 — Choose the smallest layer for the behavior under test

Fusion substitutes external boundaries only. Vitest owns assertions, lifecycle hooks, spies,
timers and coverage. Component tests must not recreate portal; lifecycle tests must not replace
all Fusion hooks with JavaScript mocks.

| Subject | Start with |
| --- | --- |
| Pure logic/framework-independent hook | Standard Vitest (`vitest`) |
| Hook consuming app modules | `renderAppHook` from `@equinor/fusion-framework-vitest-plugin-react-app` |
| Component/route/app | `test`/`render` from `@equinor/fusion-framework-vitest-plugin-react-app/test` |
| Reusable fixture without app-file resolution | `testApp` from `@equinor/fusion-framework-vitest-plugin-react-app` |
| App modules/parent framework without React | `mockAppModules` / `mockFramework`: `fusion-framework-mocking` |
| Method call/timer/global/JS module | Vitest's `vi` APIs |
| Complete cross-route/persisted workflow | Playwright served-app journey (`@playwright/test` + `@equinor/fusion-openapi-mock-server`) |

Prefer normal `/test` path; use explicit helpers only when supplying `env`/`configure`/`fusion`.

### Step 2 — Install and configure

When setup/dependencies are missing or need changes, read
`references/getting-started-and-configuration.md` for install commands, entry points,
`defineProject` defaults, overrides and non-standard app files. Preserve needed defaults:
`appTestVitePlugin`, headless Playwright Chromium, `src/**/*.{test,spec}.{ts,tsx}` and lazy-import warmup.

### Step 3 — Write the first test

When writing a normal app test, read `references/getting-started-and-configuration.md` for
first-render examples. Await initialization before assertions. For explicit hooks/components
or `testApp`, read `references/rendering-helpers.md` for options and nested `fusion.app` /
`fusion.framework` results.

### Step 4 — Compose fixtures for reuse (when several tests share seeded state)

When composing app fixtures, read `references/fixtures-and-advanced-usage.md` for
`configureApp`, `mergeEnvConfig`, extend-versus-override and production configure composition.
Reuse only when justified; `test.extend` exports shared fixture, `test.override(...)` changes one file/suite.
When configuring parent scope, route/app lifecycle or custom parent, read
`references/parent-framework-fixtures.md` for `configureFusion`, history and replacement boundaries.

### Step 5 — Diagnose failures

On failure, read `references/troubleshooting.md` before guessing: await helpers, check
`appTestVitePlugin` and answering HTTP middleware.

### Step 6 — Choose Browser Mode or an alternative renderer (only if warranted)

Browser Mode is default for fidelity, not speed. When considering another provider or
`happy-dom`/jsdom, read `references/browser-mode-and-migration.md` for tradeoffs and wiring.
DOM emulation only for components/hooks provably independent of real browser behavior.

### Step 7 — Migrate an existing suite (when applicable)

When migrating `@testing-library/react`/jsdom suites, read `references/migrating-existing-suites.md`
for incremental changes and intact diffs. Retain unaffected renderer/tests and real production configuration.

### Step 8 — Cover complete workflows with a Playwright journey (only when warranted)

Only for routes, dialogs, persisted state or primary workflow changes: read
`references/end-to-end-journeys.md` for served-app mocks, isolation, behavior assertions and CI evidence.
Run one affected journey once at final validation, not during iteration or full suite locally.

## Expected output

Smallest useful test layer; correctly registered `appTestVitePlugin`/`defineProject` setup;
awaited helpers; justified fixture composition; module seeding via `fusion-framework-mocking`.
Report exact commands/outcomes, gaps, affected journey result and whether CI evidence was requested;
never claim unperformed visual approval.

## Rationalization prevention

No passing-suite claim without fresh test output exercising the real boundary.

| Excuse | Reality |
| --- | --- |
| "Mocking all Fusion hooks is faster" | Mocking away the unit under test proves nothing; mock external boundaries only. |
| "Polyfill jsdom to skip Browser Mode" | Untested polyfills hide real browser failures; use Browser Mode unless provably DOM-independent. |
| "Render helper looks sync, skip await" | Unawaited Fusion render/hook helpers cause flaky false passes; always await. |
| "Screenshot looks fine locally, commit baseline" | Never commit local Playwright baselines or pixel gates; assert behavior. |
| "Targeted test passed, skip full check" | Report exact scope run; never claim full suite passed without running it. |
