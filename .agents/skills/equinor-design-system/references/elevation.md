# EDS elevation and shadow lookup

## Elevation and shadow

EDS v2 (`@equinor/eds-tokens` ^2) does not expose elevation as CSS custom properties. For elevated surfaces use the EDS `Paper` component which applies the correct shadow for its variant, or use EDS `Elevation` tokens via the JS object import from `@equinor/eds-tokens` when you need raw values in styled-components.

```typescript
import { Paper } from '@equinor/eds-core-react';

// Prefer Paper for cards/panels — elevation is handled automatically
<Paper elevation="raised">
  <CardContent />
</Paper>
```

If you need raw `box-shadow` values from JS (rare): import from `@equinor/eds-tokens`, not hardcoded values.

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
