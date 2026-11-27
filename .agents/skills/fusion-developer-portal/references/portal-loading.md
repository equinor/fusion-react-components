# App loading and routing

The portal routes `/apps/:appKey/*` to an app loader. Two approaches:

**Simple embed** — use the built-in `Apploader` component:

```tsx
import { Apploader } from '@equinor/fusion-framework-react-app/apploader';

<Apploader appKey="my-app" />
```

> **Warning**: `Apploader` is an experimental POC. Embedded apps may have routing and context issues. Best for simple apps like PowerBI or PowerApps views.

**Custom app loader** — for full control over loading states, error handling, and mounting. Use `useFramework<[AppModule]>()`, observe `fusion.modules.app.current$`, and call `app.initialize()`. For the annotated pattern, read [Custom app loader](portal-architecture.md#custom-app-loader).

Portal routing typically uses `react-router-dom` via the navigation module:

```tsx
const Router = () => {
  const framework = useFramework();
  const router = framework.modules.navigation.router;
  return <RouterProvider router={router} />;
};
```
