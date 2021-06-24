import { FunctionComponent } from 'react';
import { CheckboxProps } from './types';
import '@equinor/fusion-wc-checkbox';

export const Checkbox: FunctionComponent<CheckboxProps> = (props) => {
  return <fwc-checkbox {...props}></fwc-checkbox>;
};

export default Checkbox;
