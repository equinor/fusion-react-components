import { HTMLAttributes, PropsWithChildren } from 'react';
import { ButtonElement, ButtonElementProps } from '@equinor/fusion-wc-button';

ButtonElement;

export type ButtonProps = ButtonElementProps & HTMLAttributes<ButtonElement>;

export const Button = ({ children, ...rest }: PropsWithChildren<ButtonProps>): JSX.Element => {
  return <fwc-button {...rest}>{children}</fwc-button>;
};

export default Button;
