# Migrating existing suites

## Contents

- [Migrate an existing app to Fusion Vitest](#migrate-an-existing-app-to-fusion-vitest)
  - [What changes, concretely](#what-changes-concretely)
  - [Step 1 — Install Browser Mode dependencies](#step-1--install-browser-mode-dependencies)
  - [Step 2 — Replace hand-rolled Fusion hook mocks](#step-2--replace-hand-rolled-fusion-hook-mocks)
  - [Step 3 — Port the mock HTTP server](#step-3--port-the-mock-http-server)
  - [Compose a router and a domain fixture](#compose-a-router-and-a-domain-fixture)
  - [Step 4 — Update renders and assertions](#step-4--update-renders-and-assertions)
  - [Step 5 — Reassess DOM-emulation-only workarounds](#step-5--reassess-dom-emulation-only-workarounds)
  - [Migrate incrementally](#migrate-incrementally)

## Migrate an existing app to Fusion Vitest

Covers suites built with `@testing-library/react`, `jsdom`/`happy-dom`, hand-written Fusion hook
mocks, and mock HTTP servers (MirageJS, MSW, Nock). Migrate one test at a time — a mixed suite is
a valid final state.

**Choose which tests to migrate first:** start with tests reading from the application module
scope through `useAppModule`, `useAccessToken`, `useCurrentContext`, `useCurrentBookmark`,
`useFeature`, or a route using several Fusion modules — these can drop hand-written hook mocks for
the real module pipeline plus `enable*Mock` configuration. Keep pure functions, presentational
components, and Fusion-independent hooks on their current runner when that is simpler.

### What changes, concretely

| Existing pattern | Replace with |
| --- | --- |
| `@testing-library/react`'s `render`/`renderHook`/`waitFor`/`act` on `jsdom`/`happy-dom` | `vitest-browser-react`'s `render`/`renderHook` and `vitest`'s `waitFor`/`act`, on real Chromium |
| `vi.mock('@equinor/fusion-framework-react/hooks', ...)` and similar hand-rolled Fusion hook mocks | The owning module's `enable*Mock` from its own `/mock` entry point (`fusion-framework-mocking`) |
| A hand-written mock HTTP server (MirageJS, `msw/node`, `nock`) | `configurator.http.addMiddleware(...)`, or `createRouterMiddleware` for several routes under one base URI (`fusion-framework-mocking`) |
| A hand-rolled test wrapper composing a router, context providers, and error boundaries | `test.extend(...)` fixtures stacked on the base `render`/`configureApp` fixtures |
| Synchronous assertions (`expect(screen.getByText(...))`) | `await expect.element(screen.getByText(...)).toBeVisible()` |

### Step 1 — Install Browser Mode dependencies

```sh
pnpm add -D vitest playwright @vitest/browser-playwright vitest-browser-react \
  @equinor/fusion-framework-vitest-plugin-react-app
pnpm exec playwright install chromium
```

Remove `@testing-library/react`, `@testing-library/dom`, `@testing-library/user-event`, and the
`jsdom`/`happy-dom` package once every test that used them has migrated (keep them if part of the
suite intentionally stays on the old renderer). Replace `vitest.config.ts`:

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';

export default defineProject();
```

### Step 2 — Replace hand-rolled Fusion hook mocks

```diff
-vi.mock('@equinor/fusion-framework-react/hooks', async (importOriginal) => ({
-  ...(await importOriginal()),
-  useCurrentUser: vi.fn(() => undefined),
-}));
-vi.mock('@equinor/fusion-framework-react-app/feature-flag', () => ({
-  useFeature: vi.fn(() => ({})),
-}));
+import { enableFeatureFlagMock } from '@equinor/fusion-framework-module-feature-flag/mock';
+import { test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
+
+export const test = baseTest.extend('configureApp', ({ configureApp }) => (configurator, args) => {
+  configureApp?.(configurator, args);
+  configurator.msal.setAccount(null); // was: useCurrentUser returning undefined
+  enableFeatureFlagMock(configurator, (mock) => mock.addFeature({ key: 'new-search', enabled: true }));
+});
```

Each Fusion module owns its own mock entry point (`enableMsalMock`/`configurator.msal`,
`enableFeatureFlagMock`, `enableContextMock`, `enableBookmarkMock`, and more — see
`fusion-framework-mocking`). A hook or app-config piece with no Fusion dependency stays a plain
`vi.mock`. Replace a suite that overrides `useModuleCurrentContext` with `vi.spyOn` by seeding
`enableContextMock` instead; to change context after render, call the real module:
`await fusion.app.context.setCurrentContextByIdAsync(otherProject.id)`.

### Step 3 — Port the mock HTTP server

```diff
-import { createServer } from 'miragejs';
-
-export function createTestServer() {
-  return createServer({
-    routes() {
-      this.get('/activities/:id', (schema, request) => ({ id: request.params.id }));
-      this.post('/activities', (schema, request) => ({}));
-    },
-  });
-}
+import { createRouterMiddleware } from '@equinor/fusion-framework-module-http/mock';
+
+export const activityRoutes = createRouterMiddleware('https://cpr-api.example.com', (router) => {
+  router.get('/activities/:id', ({ params }) => Response.json({ id: params.id }));
+  router.post('/activities', async ({ request }) => Response.json({}));
+});
```

Register the result with `configurator.http.addMiddleware(activityRoutes)` inside a `configureApp`
fixture. Port one route file at a time — each is independently testable. An unported route can
fall through to the real network: keep the old interceptor for tests that have not migrated yet,
or add a final fail-closed middleware; do not rely on a missing route to fail by itself. Prefer
`createOpenApiMockMiddleware` over hand-written routes when the backend has an OpenAPI document.

If `useHttpClient` currently returns a plain `fetch` wrapper, remove that hook mock too — the real
client reaches middleware registered with `configurator.http.addMiddleware`.

### Compose a router and a domain fixture

Use a `render` extension for JSX wrappers (routers, app-owned providers); use a `configureApp`
extension for Fusion module state; stack both when a test needs both:

```tsx
import type { ReactElement } from 'react';
import { test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { Router } from '@equinor/fusion-framework-react-router';
import type { RouteObject } from '@equinor/fusion-framework-react-router';
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';

// Every route matches, so the element under test stays mounted.
const testWithRouter = baseTest.extend('render', () => (ui: ReactElement) => {
  const routes: RouteObject[] = [{ path: '*', Component: () => ui }];
  return baseTest.render(<Router routes={routes} />);
});

export const test = testWithRouter.extend('configureApp', ({ configureApp }) => (configurator, args) => {
  configureApp?.(configurator, args);
  enableContextMock(configurator, (mock) => mock.setCurrentContext(projectA));
});
```

Keep app-owned React providers (authorization, schema, snackbar) in the `render` extension. Move
only Fusion module state to `configureApp` and `enable*Mock`.

### Step 4 — Update renders and assertions

Every render/hook helper is `async`, and most `vitest-browser-react` assertion helpers resolve
against the real browser rather than synchronously:

```diff
-const { findByTestId } = render(<WrappedProcessPage {...props} />);
-await findByTestId('customization-panel');
+const { getByTestId } = await render(<WrappedProcessPage {...props} />);
+await expect.element(getByTestId('customization-panel')).toBeVisible();
```

`fireEvent`-style interactions become element method calls (`await screen.getByRole('button', {
name: 'Activate' }).click()`); `act`/`waitFor` come from `vitest` rather than
`@testing-library/react`.

### Step 5 — Reassess DOM-emulation-only workarounds

Review polyfills and component replacements that may only exist for `jsdom`/`happy-dom`. Remove
one workaround at a time and run the affected tests against the real component. A common one: a
no-op `window.ResizeObserver` stub — real Chromium doesn't need it, and leaving it in place
silently breaks any component that measures itself through `ResizeObserver` before rendering (a
virtualized popover list, for example). Do not remove unrelated suppressions automatically — AG
Grid license messages, Lit dev-mode warnings, and app-specific test doubles may still apply.

### Migrate incrementally

Nothing requires migrating a whole app in one pass. A common order: pick one page/route-level test
that already hand-mocks several Fusion hooks, migrate it end to end (steps 1-4), confirm it's
green, then migrate the next. Leave Fusion-independent tests on their current renderer for as long
as that stays the cheaper option.
