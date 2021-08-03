import { HTMLAttributes, PropsWithChildren } from 'react';
import TextAreaElement, { TextAreaElementProps } from '@equinor/fusion-wc-textarea/lib/element';
import '@equinor/fusion-wc-textarea';

export type TextAreaProps = TextAreaElementProps & HTMLAttributes<TextAreaElement>;

export const TextArea = ({ children, ...rest }: PropsWithChildren<TextAreaProps>): JSX.Element => {
  return <fwc-textarea {...rest}>{children}</fwc-textarea>;
};

export default TextArea;
