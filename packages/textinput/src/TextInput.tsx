import { HTMLAttributes, PropsWithChildren } from 'react';
import TextInputElement, { TextInputElementProps } from '@equinor/fusion-wc-textinput/lib/element';
import '@equinor/fusion-wc-textinput';

export type TextInputProps = TextInputElementProps & HTMLAttributes<TextInputElement>;

export const TextInput = ({ children, ...rest }: PropsWithChildren<TextInputProps>): JSX.Element => {
  return <fwc-textinput {...rest}>{children}</fwc-textinput>;
};
