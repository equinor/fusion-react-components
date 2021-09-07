import { HTMLAttributes } from 'react';

import { elementAttributes } from '@equinor/fusion-react-utils';

import RadioElement, { RadioElementProps } from '@equinor/fusion-wc-radio';
import FormFieldElment, { FormfieldElementProps } from '@equinor/fusion-wc-formfield';

RadioElement;
FormFieldElment;

export type RadioProps = RadioElementProps &
  HTMLAttributes<RadioElement> & {
    label?: string;
    formfield?: FormfieldElementProps;
  };

export const Radio = (props: RadioProps): JSX.Element => {
  const { formfield = {}, label, ...attr } = elementAttributes(props as RadioProps);
  formfield.label = label;
  return (
    <fwc-formfield {...formfield}>
      <fwc-radio {...attr} />
    </fwc-formfield>
  );
};

export default Radio;
