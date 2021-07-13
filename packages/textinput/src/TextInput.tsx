import { FunctionComponent } from 'react';
import { TextInputProps } from './types';
import '@equinor/fusion-wc-textinput';

export const TextInput: FunctionComponent<TextInputProps> = (props) => {
  return <fwc-textinput {...props}></fwc-textinput>;
};

export default TextInput;
