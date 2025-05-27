import { createComponent } from '@equinor/fusion-react-utils';

import HTMLRippleCustomElement, {
  tag,
  RippleElement,
  type RippleElementProps,
  RippleHandlers,
} from '@equinor/fusion-wc-ripple';

export { HTMLRippleCustomElement, RippleElement, type RippleElementProps, RippleHandlers };

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLRippleCustomElement, 'primary' | 'accent' | 'unbounded' | 'activated' | 'selected' | 'disabled'>>
>;

export const Ripple = createComponent<HTMLRippleCustomElement, ElementProps>(HTMLRippleCustomElement, tag);

export type RippleProps = React.ComponentProps<typeof Ripple>;

export default Ripple;
