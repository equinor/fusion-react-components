import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLChipCustomElement, { tag } from '@equinor/fusion-wc-chip';

export { HTMLChipCustomElement };

export const Chip = createComponent(ReactModule, tag, HTMLChipCustomElement);
export type ChipProps = React.ComponentProps<typeof Chip>;

export default Chip;
