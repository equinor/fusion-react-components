import { HTMLAttributes } from 'react';

import { elementAttributes } from '@equinor/fusion-react-utils';

import SwitchElement, { SwitchElementProps } from '@equinor/fusion-wc-switch';
import FormFieldElement, { FormfieldElementProps } from '@equinor/fusion-wc-formfield';

SwitchElement;
FormFieldElement;

export type SwitchProps = SwitchElementProps &
  HTMLAttributes<SwitchElement> & {
    label?: string;
    formfield?: FormfieldElementProps;
  };

export const Switch = (props: SwitchProps): JSX.Element => {
  const { formfield = {}, label, ...attr } = elementAttributes(props as SwitchProps);
  formfield.label = label;
  return (
    <fwc-formfield {...formfield}>
      <fwc-switch {...attr} />
    </fwc-formfield>
  );
};

export default Switch;
