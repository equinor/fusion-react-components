import { HTMLAttributes } from 'react';
import RadioElement, { RadioElementProps } from '@equinor/fusion-wc-radio/lib/element';
import '@equinor/fusion-wc-radio';

export type RadioProps = RadioElementProps & HTMLAttributes<RadioElement>;

export const Radio = ({ ...rest }: RadioProps): JSX.Element => {
  return <fwc-radio {...rest}></fwc-radio>;
};

export default Radio;
