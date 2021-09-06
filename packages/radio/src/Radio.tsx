import { FormEvent, HTMLAttributes, useCallback } from 'react';

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
  const { formfield = {}, label, onChange, ...attr } = elementAttributes(props as RadioProps);
  formfield.label = label;
  const onInput = useCallback(
    ({ nativeEvent, currentTarget: target }: FormEvent<RadioElement>) => {
      // @ts-ignore
      onChange && onChange({ nativeEvent, target });
    },
    [onChange]
  );
  return (
    <fwc-formfield {...formfield}>
      <fwc-radio {...attr} onInput={onInput} />
    </fwc-formfield>
  );
};

export default Radio;
