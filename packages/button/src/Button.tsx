import { HTMLAttributes, PropsWithChildren } from 'react';
import ButtonElement, { ButtonElementProps } from '@equinor/fusion-wc-button/lib/element';
import '@equinor/fusion-wc-button';

export type ButtonProps = ButtonElementProps & HTMLAttributes<ButtonElement>;

export const Button = ({ children, ...rest }: PropsWithChildren<ButtonProps>): JSX.Element => {
  return <fwc-button {...rest}>{children}</fwc-button>;
};

export default Button;
