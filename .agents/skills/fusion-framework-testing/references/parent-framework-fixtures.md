# Parent framework fixtures and app lifecycle

## Extend the parent framework mock with `configureFusion`

`fusion` (built by `resolveFusion`) always carries a mocked `app` module and a `navigation` module
with in-memory history (so tests don't leak URL/history state), and mocks `featureFlag` with no
flags enabled — but only when `@equinor/fusion-framework-module-feature-flag` (an optional peer
dependency) is actually installed. `configureFusion` runs on the same configurator afterwards, so
a test can add framework-level modules or override that setup without reimplementing it:

```tsx
import { enableFeatureFlagMock } from '@equinor/fusion-framework-module-feature-flag/mock';

const test = baseTest.extend('configureFusion', { injected: true }, () => (configurator) => {
  enableFeatureFlagMock(configurator, (mock) => mock.addFeature({ key: 'new-search', enabled: true }));
  configurator.serviceDiscovery.addServices([{ key: 'people', uri: baseUrl('people') }]);
});
```

This is a **framework-scope** module set, distinct from the app-scope one `configureApp` seeds —
overriding history through `configureFusion` affects framework-scope consumers
(`useFramework<[NavigationModule]>().modules.navigation`, `useBookmarkNavigate`), not a rendered
app's own router (which registers its own `navigation` module inside its own `config.ts`).

> [!IMPORTANT]
> `.override('fusion', ...)` bypasses `configureFusion` entirely — it replaces the resolver that
> calls it, so a `configureFusion` override on the same test/suite is silently never called. Reach
> for `configureFusion` to extend the base mock; reach for `fusion` only to replace it outright.

## Test routes and app lifecycle

Render the complete `App` when assertions depend on route loaders, navigation, app configuration,
or several modules working together. Set the initial browser URL before rendering, interact
through visible controls or `app.navigation`, and assert the rendered result.

## Supply a custom parent framework

Override or explicitly pass `fusion` when the scenario depends on portal-level context, service
discovery, authentication, or app manifests. Build the parent with `mockFramework`
(`fusion-framework-mocking`), then initialize the app beneath it — this exercises
parent-to-app propagation without a running portal. Use `enableAppManifestMock` when the custom
parent must serve the app's manifest and config.
