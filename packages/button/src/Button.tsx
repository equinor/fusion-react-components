import { tag, ButtonElement } from '@equinor/fusion-wc-button';

import { createComponent } from '@equinor/fusion-react-utils';

type ButtonElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      ButtonElement,
      'color' | 'dense' | 'disabled' | 'icon' | 'label' | 'trailingIcon' | 'variant' | 'expandContent'
    >
  >
>;

export const Button = createComponent<ButtonElement, ButtonElementProps>(ButtonElement, tag);
export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
