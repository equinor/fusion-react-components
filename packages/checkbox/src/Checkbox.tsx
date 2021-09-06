import { ChangeEvent, ChangeEventHandler, FormEvent, HTMLAttributes, useCallback } from 'react';
import { CheckboxElement, CheckboxElementProps } from '@equinor/fusion-wc-checkbox';

import { elementAttributes } from '@equinor/fusion-react-utils';

import '@equinor/fusion-wc-checkbox';
import { FormfieldElementProps } from '@equinor/fusion-wc-formfield';

// TODO add  prop for label and wrap element inside

export type TextInputChangeHandler = ChangeEventHandler<CheckboxElement>;
export type TextInputChangeEvent = ChangeEvent<CheckboxElement>;

export type CheckboxProps = CheckboxElementProps &
  HTMLAttributes<CheckboxElement> & {
    onChange?: TextInputChangeHandler;
    label?: string;
    formfield?: FormfieldElementProps;
  };

export const Checkbox = ({ onChange, ...props }: CheckboxProps): JSX.Element => {
  const { formfield = {}, label, ...attr } = elementAttributes(props as CheckboxProps);
  formfield.label = label;
  const onInput = useCallback(
    ({ nativeEvent, currentTarget: target }: FormEvent<CheckboxElement>) => {
      // @ts-ignore
      onChange && onChange({ nativeEvent, target });
    },
    [onChange]
  );
  return (
    <fwc-formfield {...formfield}>
      <fwc-checkbox {...attr} onInput={onInput} />
    </fwc-formfield>
  );
};

export default Checkbox;
