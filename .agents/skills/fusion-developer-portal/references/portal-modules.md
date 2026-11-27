# Configure portal modules

Portal-level configuration uses `FrameworkConfigurator` (not `AppModuleInitiator` like apps). Enable modules in your configure callback:

```typescript
import type { FrameworkConfigurator } from '@equinor/fusion-framework';
import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableAnalytics } from '@equinor/fusion-framework-module-analytics';

const configure = (configurator: FrameworkConfigurator) => {
  enableAppModule(configurator);
  enableNavigation(configurator, '/');
  enableAnalytics(configurator, { /* ... */ });
};
```

Key difference from app configuration: the portal configures `FrameworkConfigurator` and its modules are hoisted to all child apps. MSAL/auth is configured at portal level and inherited by apps.

Full module configuration and `portal-analytics` cookbook reference are selected directly from SKILL.md.
