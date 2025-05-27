import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import HTMLRippleCustomElement, { tag, RippleElement, RippleHandlers } from '@equinor/fusion-wc-ripple';

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLRippleCustomElement, 'primary' | 'accent' | 'unbounded' | 'activated' | 'selected' | 'disabled'>>
>;

export const Ripple = createComponent<HTMLRippleCustomElement, ElementProps>(HTMLRippleCustomElement, tag);

export type RippleProps = ComponentProps<HTMLRippleCustomElement, ElementProps>;

export { HTMLRippleCustomElement, RippleElement, RippleHandlers };

export default Ripple;
