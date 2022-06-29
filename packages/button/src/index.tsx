import { ButtonElement as HTMLButtonCustomElement, tag } from '@equinor/fusion-wc-button';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type ButtonElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLButtonCustomElement,
      'color' | 'dense' | 'disabled' | 'icon' | 'label' | 'trailingIcon' | 'variant' | 'expandContent'
    >
  >
>;

export const Button = createComponent<HTMLButtonCustomElement, ButtonElementProps>(HTMLButtonCustomElement, tag);
export type ButtonProps = ComponentProps<HTMLButtonCustomElement, ButtonElementProps>;

export { HTMLButtonCustomElement };

export default Button;
