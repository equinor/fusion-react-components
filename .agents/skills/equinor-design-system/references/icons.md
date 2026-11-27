# EDS icon usage lookup

## Icon usage

Use `@equinor/eds-icons` with the EDS `Icon` component. Do not import SVGs directly or use third-party icon sets. Always pass icon data via the `data` prop — do not use the `name` string prop. Icon names from `@equinor/eds-icons` are in `snake_case`.

```typescript
import { Icon } from '@equinor/eds-core-react';
import { add, close, settings } from '@equinor/eds-icons';

// Pass icon data object via the `data` prop; provide `title` for accessibility
<Icon data={add} title="Add" />
<Icon data={close} title="Close" size={16} />
<Icon data={settings} title="Settings" />
```

Icon sizes follow a fixed scale: `16`, `24` (default), `32`, `40`, `48`. Do not set arbitrary sizes.

## Sources

- EDS design resources: https://eds.equinor.com/docs/resources/
- EDS component library: https://eds.equinor.com/components/
- Equinor brand color: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100056
- Equinor brand typography: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100059
- Equinor brand layout: https://communicationtoolbox.equinor.com/point/en/equinor/component/default/100061
