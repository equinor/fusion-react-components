import type { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLDividerCustomElement, {
  tag,
  DividerColor,
  DividerSpacing,
  DividerVariant,
  DividerOrientation,
} from '@equinor/fusion-wc-divider';

type ElementAttributes = Partial<Pick<HTMLDividerCustomElement, 'color' | 'spacing' | 'variant' | 'orientation'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const Divider = createComponent<HTMLDividerCustomElement, ElementProps>(HTMLDividerCustomElement, tag);

export type DividerProps = ComponentProps<HTMLDividerCustomElement, ElementProps>;

export { HTMLDividerCustomElement, DividerColor, DividerSpacing, DividerVariant, DividerOrientation };

export default Divider;
