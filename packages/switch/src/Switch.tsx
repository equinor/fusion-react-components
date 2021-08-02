import { HTMLAttributes } from 'react';
import SwitchElement, { SwitchElementProps } from '@equinor/fusion-wc-switch/lib/element';
import '@equinor/fusion-wc-switch';

export type SwitchProps = SwitchElementProps & HTMLAttributes<SwitchElement>;

export const Switch = ({ ...rest }: SwitchProps): JSX.Element => {
  return <fwc-switch {...rest}></fwc-switch>;
};

export default Switch;
