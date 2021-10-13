import { tag, ButtonElement } from '@equinor/fusion-wc-button';

import { createComponent } from '@equinor/fusion-react-utils';

export type ButtonProps = React.PropsWithChildren<
  Partial<
    Pick<
      ButtonElement,
      'color' | 'dense' | 'disabled' | 'icon' | 'label' | 'trailingIcon' | 'variant' | 'expandContent'
    >
  >
>;

export const Button = createComponent<ButtonElement, ButtonProps>(ButtonElement, tag);

export default Button;
