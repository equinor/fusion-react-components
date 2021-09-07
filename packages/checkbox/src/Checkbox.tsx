import { ChangeEventHandler, HTMLAttributes } from 'react';

import { elementAttributes } from '@equinor/fusion-react-utils';

import { CheckboxElement, CheckboxElementProps } from '@equinor/fusion-wc-checkbox';
import { FormfieldElement, FormfieldElementProps } from '@equinor/fusion-wc-formfield';

CheckboxElement;
FormfieldElement;

export type CheckboxProps = CheckboxElementProps &
  HTMLAttributes<CheckboxElement> & {
    onChange?: ChangeEventHandler<CheckboxElement>;
    label?: string;
    formfield?: FormfieldElementProps;
  };

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { formfield = {}, label, ...attr } = elementAttributes(props as CheckboxProps);
  formfield.label = label;
  return (
    <fwc-formfield {...formfield}>
      <fwc-checkbox {...attr} />
    </fwc-formfield>
  );
};

export default Checkbox;
