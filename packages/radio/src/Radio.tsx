import { FunctionComponent } from 'react';
import { RadioProps } from './types';
import '@equinor/fusion-wc-radio';

export const Radio: FunctionComponent<RadioProps> = (props) => {
  return <fwc-radio {...props}></fwc-radio>;
};

export default Radio;
