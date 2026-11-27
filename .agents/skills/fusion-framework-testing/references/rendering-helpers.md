# Explicit rendering helpers

## Contents

- [Choose a rendering API](#choose-a-rendering-api)
- [`renderAppHook`](#renderapphook)
- [`renderAppComponent`](#renderappcomponent)
- [`testApp`](#testapp)

## Choose a rendering API

| API | Use it when |
| --- | --- |
| `test` from `/test` | The app's manifest, config, and module configurator should resolve automatically |
| `render` from `/test` | A standard `describe`/`it` block needs the automatically resolved app scope |
| `renderAppHook` | A hook needs an app scope with explicitly supplied options |
| `renderAppComponent` | A component needs explicit `env`, `configure`, or parent `fusion` options |
| `testApp` | A reusable fixture should not depend on Vite's automatic app-file resolution |

All Fusion rendering APIs initialize modules asynchronously and must be awaited. The lower-level
helpers return `fusion.framework` and `fusion.app`, letting a test drive the exact module
instances the rendered subject consumed.

## `renderAppHook`

```ts
function renderAppHook<Result, Props = undefined, TModules = unknown, TEnv extends AppEnv = AppEnv>(
  render: (initialProps?: Props) => Result,
  options?: {
    configure?: AppMockConfigureFn<TModules, TEnv>;
    env?: TEnv;
    fusion?: Fusion;
  } & Omit<RenderHookOptions<Props>, 'wrapper'>,
): Promise<RenderHookResult<Result, Props> & { fusion: { framework: Fusion; app: AppModulesInstance<TModules> } }>;
```

| Option | Description |
| --- | --- |
| `configure` | Forwarded to `mockAppModules` for seeding app-scope modules |
| `env` | The application environment (manifest); defaults to a generic standalone `test-app` |
| `fusion` | The parent Fusion instance; defaults to a fresh `mockFramework` instance serving this app's own manifest |

```tsx
import { renderAppHook } from '@equinor/fusion-framework-vitest-plugin-react-app';
import { useAccessToken } from '@equinor/fusion-framework-react-app/msal';

test('resolves an access token', async () => {
  const { result } = await renderAppHook(() => useAccessToken({ scopes: ['User.Read'] }));
  await vi.waitFor(() => expect(result.current.pending).toBe(false));
  expect(result.current.token).toBeDefined();
});
```

Pass `configure` to reach a module's mock builder before the hook renders:

```tsx
test('reads the configured account', async () => {
  const { result } = await renderAppHook(() => useCurrentAccount(), {
    configure: (configurator) => configurator.msal.setAccount({ name: 'Ada Lovelace' }),
  });
  expect(result.current).toMatchObject({ name: 'Ada Lovelace' });
});
```

Reuse a pre-built `fusion` across multiple render calls, or to pre-configure parent-level modules
(`http`, `context`, `serviceDiscovery`):

```tsx
import { mockFramework } from '@equinor/fusion-framework/mock';
import { enableAppManifestMock } from '@equinor/fusion-framework-app/mock';

const env = { manifest: { appKey: 'test-app', displayName: 'Test App', description: '', type: 'standalone' as const } };

test('shares one fusion instance across two renders', async () => {
  const fusion = await mockFramework<[AppModule]>((configurator) => enableAppManifestMock(configurator, env));

  const { result: a } = await renderAppHook(() => useAccessToken({ scopes: ['User.Read'] }), { fusion });
  const { result: b } = await renderAppHook(() => useCurrentAccount(), { fusion });
});
```

## `renderAppComponent`

Same options shape as `renderAppHook` (`configure`, `env`, `fusion`), plus any
`vitest-browser-react` `render` option. The result carries the usual return values (`getByText`,
`container`, `unmount`) plus a **nested** `fusion` (not spread) — `fusion.app` is the same
instance the rendered component reads through `useAppModule`/`useAppModules`; `fusion.framework`
is the parent instance. Drive a module directly through `fusion.app` to exercise a state change
after the initial render:

```tsx
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';
import { act } from 'react';
import { renderAppComponent } from '@equinor/fusion-framework-vitest-plugin-react-app';

test('reacts when the current context switches', async () => {
  const { getByText, fusion } = await renderAppComponent<[ContextModule]>(<App />, {
    configure: (configurator) => enableContextMock(configurator, (mock) => mock.setCurrentContext(projectA)),
  });

  await act(() => fusion.app.context.setCurrentContextByIdAsync(projectB.id));
  await expect.element(getByText(/project-b/)).toBeVisible();
});
```

Loading/error-state example:

```tsx
test('mounts the child app once its script loads', async () => {
  const manifest: AppManifest = { appKey: 'child-app', displayName: 'Child App', description: '', type: 'standalone', build: { version: '1.0.0', entryPoint: 'child-script.ts', assetPath: '' } };
  const fusion = await mockFramework<[AppModule]>((configurator) => enableAppManifestMock(configurator, { manifest }));

  const { container } = await renderAppComponent(<Apploader appKey="child-app" />, { fusion });

  // the loading state renders synchronously, before the script's dynamic import resolves
  expect(container.textContent).toContain('Loading child-app');
  await vi.waitFor(() => expect(container.textContent).toContain('mounted: child-app'));
});
```

## `testApp`

`vitest`'s `test`, extended with an application module scope fixture: `appEnv`/`configureApp`
become suite-level concerns overridden once per file (or per `describe`) with
`testApp.extend(...)`, instead of an options object repeated on every call. `fusion`/`app` resolve
lazily — a test that only destructures `app` never pays for rendering.

```tsx
import { testApp } from '@equinor/fusion-framework-vitest-plugin-react-app';

testApp('resolves current context', async ({ app, render }) => {
  const screen = await render(<App />);
  expect(app.context).toBeDefined();
});
```

Seed a module for every test in a suite:

```tsx
describe('with a seeded context module', () => {
  const test = testApp.extend(
    'configureApp',
    { injected: true },
    (): AppMockConfigureFn => (configurator) => enableContextMock(configurator, (mock) => mock.setCurrentContext(projectA)),
  );

  test('starts on the seeded context', async ({ render }) => {
    const screen = await render(<App />);
    await expect.element(screen.getByText(projectA.title)).toBeVisible();
  });
});
```
