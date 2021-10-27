import type { PropsWithChildren, PointerEventHandler, ComponentProps } from 'react';

import { createComponent } from '@equinor/fusion-react-utils';
import { ChipElement as HTMLChipCustomElement, tag } from '@equinor/fusion-wc-chip';

export { HTMLChipCustomElement };

type ElementAttributes = Partial<
  Pick<
    HTMLChipCustomElement,
    'active' | 'clickable' | 'disabled' | 'icon' | 'removable' | 'size' | 'tooltip' | 'value' | 'variant'
  >
>;

type ElementEvents = {
  onRemove?: PointerEventHandler;
};

type ElementProps = PropsWithChildren<ElementAttributes & ElementEvents>;

export const Chip = createComponent<HTMLChipCustomElement, ElementProps>(HTMLChipCustomElement, tag, {
  events: {
    onRemove: 'remove',
  },
});

export type ChipProps = ComponentProps<typeof Chip>;

export default Chip;
