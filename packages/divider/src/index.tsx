import type { PropsWithChildren, ComponentProps } from 'react';
import { createComponent } from '@equinor/fusion-react-utils';
import HTMLDividerCustomElement, {
  tag,
  DividerColor,
  DividerSpacing,
  DividerVariant,
  DividerOrientation,
} from '@equinor/fusion-wc-divider';

export { HTMLDividerCustomElement, DividerColor, DividerSpacing, DividerVariant, DividerOrientation };

type ElementAttributes = Partial<Pick<HTMLDividerCustomElement, 'color' | 'spacing' | 'variant' | 'orientation'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const Divider = createComponent<HTMLDividerCustomElement, ElementProps>(HTMLDividerCustomElement, tag);

export type DividerProps = ComponentProps<typeof Divider>;

export default Divider;
