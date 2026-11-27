# Analytics and telemetry

Portal-level analytics capture app lifecycle events. Enable with adapters and collectors:

```typescript
import { enableAnalytics } from '@equinor/fusion-framework-module-analytics';
import { ConsoleAnalyticsAdapter } from '@equinor/fusion-framework-module-analytics/adapters';
import { AppLoadedCollector, AppSelectedCollector } from '@equinor/fusion-framework-module-analytics/collectors';

enableAnalytics(configurator, (builder) => {
  builder.addAdapter(new ConsoleAnalyticsAdapter());
  builder.addCollector(new AppLoadedCollector());
  builder.addCollector(new AppSelectedCollector());
});
```

Telemetry (OpenTelemetry / Application Insights) guidance is selected directly from SKILL.md.
