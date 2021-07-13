import { FunctionComponent } from 'react';
import { TextAreaProps } from './types';
import '@equinor/fusion-wc-textarea';

export const TextArea: FunctionComponent<TextAreaProps> = (props) => {
  return <fwc-textarea {...props}></fwc-textarea>;
};

export default TextArea;
