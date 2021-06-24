import { FunctionComponent } from 'react';
import { SwitchProps } from './types';
import '@equinor/fusion-wc-switch';

export const Switch: FunctionComponent<SwitchProps> = (props) => {
  return <fwc-switch {...props}></fwc-switch>;
};

export default Switch;
