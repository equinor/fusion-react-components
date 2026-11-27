# Browser Mode and migration

## Why Browser Mode is the default

`@equinor/fusion-framework-vitest-plugin-react-app` runs component and hook tests in headless
Chromium by default — real DOM behavior, at the cost of speed relative to `happy-dom`/`jsdom`
(which run in the same Node process as the test; Browser Mode starts Chromium through Playwright
and communicates with that browser process). Choose Browser Mode for fidelity, not speed. Keep
fast unit tests on Node or DOM emulation when they do not need browser behavior.

Why use a real browser at all:
- **Real framework execution:** tests control external boundaries and seed module state through
  module mocks (see `fusion-framework-mocking`), while the actual module configuration,
  lifecycle, providers, and rendering behavior still run.
- **Browser fidelity:** Chromium provides real layout, `ResizeObserver`, custom elements, and
  Shadow DOM — behavior `happy-dom`/`jsdom` only approximate.

> [!WARNING]
> A DOM-emulation gap is usually patched one of two ways: a polyfill standing in for the missing
> browser API, or a component replacement that avoids exercising it at all. Both are test-only
> code with no equivalent in production, and both defeat the point of the test — a polyfill can
> drift from real browser behavior unnoticed, and a mocked component only proves the *mock*
> renders correctly, never the real one. Treat every DOM-emulation workaround as debt to remove,
> not a pattern to reach for.

A real browser does not eliminate every workaround: AG Grid license messages and Lit dev-mode
warnings are console noise from real Chromium runs, not DOM-emulation gaps, and suppressing them
carries none of the risk above. Remove a DOM-emulation-only workaround only after confirming the
affected test still passes against the real component in Browser Mode.

## Choose a different runtime

### Another browser provider

Pass `test.browser.provider` to `defineProject` to replace Playwright while staying in Browser
Mode:

```ts
import { defineProject } from '@equinor/fusion-framework-vitest-plugin-react-app/config';
import { webdriverio } from '@vitest/browser-webdriverio';

export default defineProject({ test: { browser: { provider: webdriverio() } } });
```

### `happy-dom` or `jsdom`

> [!CAUTION]
> Rendering with `happy-dom`/`jsdom` reintroduces the DOM-emulation tradeoff above. Only take this
> path for a component/hook that provably does not need browser fidelity — otherwise stay in
> Browser Mode.

The Fusion module setup does not depend on Browser Mode — build the same provider tree and pass
it to another renderer:

```tsx
import { render } from '@testing-library/react';
import { mockFramework } from '@equinor/fusion-framework/mock';
import { enableAppManifestMock, mockAppModules } from '@equinor/fusion-framework-app/mock';
import { FrameworkProvider } from '@equinor/fusion-framework-react';
import { ModuleProvider } from '@equinor/fusion-framework-react-module';
import type { AppModule } from '@equinor/fusion-framework-module-app';
import type { ReactElement } from 'react';

const env = { manifest: { appKey: 'test-app', displayName: 'Test App', description: 'Test app', type: 'standalone' } } as const;

async function renderWithHappyDom(ui: ReactElement) {
  const framework = await mockFramework<[AppModule]>((configurator) => enableAppManifestMock(configurator, env));
  const app = await mockAppModules(undefined, env, framework);
  return render(ui, {
    wrapper: ({ children }) => (
      <FrameworkProvider value={framework}>
        <ModuleProvider value={app}>{children}</ModuleProvider>
      </FrameworkProvider>
    ),
  });
}
```

Run this in a Vitest project with `environment: 'happy-dom'` instead of `browser.enabled` — use a
separate project if the same app also has Browser Mode tests. Call the same `enable*Mock`
functions from the `mockAppModules` configuration callback; these mocks configure Fusion modules
and do not depend on the renderer. `renderHook` from `@testing-library/react` can use the same
wrapper for hook tests.

## Related

- `references/getting-started-and-configuration.md` — install, `defineProject`, layer choice
- `references/fixtures-and-advanced-usage.md` — composing/overriding fixtures
- `references/troubleshooting.md` — common setup, browser, and network failures
- `fusion-framework-mocking` skill — `enable*Mock` and HTTP/OpenAPI mocking details
- [Vitest Browser Mode](https://vitest.dev/guide/browser/) / [Mocking](https://vitest.dev/guide/mocking)
