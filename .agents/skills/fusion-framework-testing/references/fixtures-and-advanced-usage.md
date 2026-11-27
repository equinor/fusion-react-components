# Fixtures and advanced usage

## Contents

- [Extend app configuration (`/test`'s `configureApp`)](#extend-app-configuration-tests-configureapp)
- [Fake an endpoint URL with `mergeEnvConfig`](#fake-an-endpoint-url-with-mergeenvconfig)
- [Override a fixture for one test or `describe` block](#override-a-fixture-for-one-test-or-describe-block)
- [Runner-level advanced behavior](#runner-level-advanced-behavior)
- [Related](#related)

The `/test` entry point extends Vitest's test context with `appEnv`, `configureApp`,
`configureFusion`, `fusion`, `app`, `render`, and `renderHook`. Fixture declarations are reusable,
while each test still receives fresh framework and app module instances. See Vitest's own
[Test Context](https://vitest.dev/guide/test-context) docs for fixture scope, cleanup, and the
general `test.extend`/`test.override` mechanics this builds on.

## Extend app configuration (`/test`'s `configureApp`)

Extend `test` from `/test` (not `testApp`) when several cases need the same deterministic
modules: `testApp`'s `configureApp` defaults to `undefined` (no Vite dependency, so no way to load
the real `src/config.ts` as live code), while `/test`'s `test` seeds it with the app's real
`configure` export via `appTestVitePlugin`'s virtual modules.

```tsx
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';
import { test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';

export const test = baseTest.extend('configureApp', ({ configureApp }) => (configurator, args) => {
  configureApp?.(configurator, args); // compose, don't replace, the app's real production config
  enableContextMock(configurator, (mock) => mock.setCurrentContext(project));
});
```

`.extend(...)` returns a new, separately exported `test` — reach for it when several test **files**
need the same fixture default. Within one file, prefer `test.override(...)`: it replaces a fixture
in place, so every test in that file keeps importing the same `test`.

## Fake an endpoint URL with `mergeEnvConfig`

`appEnv.config` is an `AppConfig` instance whose `environment`/`endpoints` live behind private
fields — `{ ...appEnv.config, endpoints: {...} }` silently drops everything. Use `mergeEnvConfig`
to fake one endpoint's URL while keeping every other endpoint and environment variable intact:

```tsx
import { mergeEnvConfig, test as baseTest } from '@equinor/fusion-framework-vitest-plugin-react-app/test';

export const test = baseTest.extend('appEnv', ({ appEnv }) =>
  mergeEnvConfig(appEnv, { endpoints: { 'cpr-api': { url: backendBaseUrl } } }),
);
```

## Override a fixture for one test or `describe` block

`test.override('name', ...)` replaces a fixture's resolved value without creating a new `test`
export. Called at the top of a `describe` block, it applies only inside that block and does not
leak to siblings; called at the top of a file, it applies to every test in that file.

`configureApp`'s default value (from `/test`) **is** the app's real `src/config.ts` `configure`
export — an override that doesn't call the real `configure(configurator, args)` itself skips the
app's production module setup entirely rather than composing with it:

```tsx
import { test } from '@equinor/fusion-framework-vitest-plugin-react-app/test';
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';
import { describe } from 'vitest';
import { configure } from '../config'; // the app's own, real module configurator

describe('with an initial project', () => {
  test.override('configureApp', { injected: true }, () => (configurator, args) => {
    configure(configurator, args); // compose the app's real configure, same as `.extend`
    enableContextMock(configurator, (mock) => mock.setCurrentContext(project));
  });

  test('displays the initial context the app resolves on startup', async ({ render }) => {
    const { getByText } = await render(<App />);
    await expect.element(getByText(/project-a/)).toBeInTheDocument();
  });
});
```

`fusion` itself can be overridden the same way, for a differently configured parent framework:

```tsx
test.override('fusion', async ({ appEnv }) =>
  mockFramework<[AppModule, ContextModule]>((configurator) => {
    enableAppManifestMock(configurator, appEnv);
    enableContextMock(configurator, (mock) => mock.setCurrentContext(project));
  }),
);
```

`{ injected: true }` matches the fixture's original declaration; keeping it consistent avoids
re-deriving whether the base fixture accepts a config-injected value.

## Runner-level advanced behavior

Fusion does not wrap these Vitest capabilities — use Vitest's own docs directly:

- [Browser interactions and assertions](https://vitest.dev/guide/browser/)
- [Asynchronous tests](https://vitest.dev/guide/learn/async)
- [Test projects](https://vitest.dev/guide/projects)
- [Coverage](https://vitest.dev/guide/coverage)
- [Debugging](https://vitest.dev/guide/debugging)

## Related

- `references/getting-started-and-configuration.md` — install, `defineProject`, layer choice
- `references/troubleshooting.md` — common failures, including fixture/override pitfalls
- `fusion-framework-mocking` skill — `mockFramework`, `enable*Mock`, HTTP/OpenAPI seeding details
