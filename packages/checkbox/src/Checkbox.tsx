import { HTMLAttributes } from 'react';
import CheckboxElement, { CheckboxElementProps } from '@equinor/fusion-wc-checkbox/lib/element';
import '@equinor/fusion-wc-checkbox';

export type CheckboxProps = CheckboxElementProps & HTMLAttributes<CheckboxElement>;

export const Checkbox = ({ ...rest }: CheckboxProps): JSX.Element => {
  return <fwc-checkbox {...rest}></fwc-checkbox>;
};

export default Checkbox;
