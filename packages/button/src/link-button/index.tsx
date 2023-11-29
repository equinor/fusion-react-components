import { LinkButtonElement as HTMLLinkButtonCustomElement, buttonLinkTag } from '@equinor/fusion-wc-button';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type LinkButtonElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLLinkButtonCustomElement,
      | 'href'
      | 'target'
      | 'color'
      | 'dense'
      | 'disabled'
      | 'icon'
      | 'label'
      | 'trailingIcon'
      | 'variant'
      | 'expandContent'
    >
  >
>;

export const LinkButton = createComponent<HTMLLinkButtonCustomElement, LinkButtonElementProps>(
  HTMLLinkButtonCustomElement,
  buttonLinkTag,
);
export type LinkButtonProps = ComponentProps<HTMLLinkButtonCustomElement, LinkButtonElementProps>;

export { HTMLLinkButtonCustomElement };

export default LinkButton;
