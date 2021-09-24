import { HTMLAttributes, PropsWithChildren, forwardRef, ForwardedRef } from 'react';
import HTMLButtonCustomElement, { ButtonElementProps } from '@equinor/fusion-wc-button';

// preserve code
HTMLButtonCustomElement;

// reference to real element
export { HTMLButtonCustomElement };

export type ButtonProps = ButtonElementProps & HTMLAttributes<HTMLButtonCustomElement>;

export const Button = forwardRef(
  (props: PropsWithChildren<ButtonProps>, ref: ForwardedRef<HTMLButtonCustomElement>) => {
    const { children, ...attr } = props;
    return (
      <fwc-button {...attr} ref={ref}>
        {children}
      </fwc-button>
    );
  }
);

Button.displayName = '@equinor/fusion-react-button';

export default Button;
