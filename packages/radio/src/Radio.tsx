import { forwardRef } from 'react';
import { RadioBase, HTMLRadioCustomElement } from './RadioBase';
import { FormfieldElementProps, FormfieldElement } from '@equinor/fusion-wc-formfield';

// TODO import from @equinor/fusion-react-form when created
FormfieldElement;
const createFormfieldProps = (props: FormfieldElementProps) =>
  Object.keys(props).reduce((cur, key) => {
    const value = props[key as keyof FormfieldElementProps];
    return value ? Object.assign(cur, { [key]: value }) : cur;
  }, {});

export type RadioProps = React.ComponentProps<typeof RadioBase> & FormfieldElementProps;

export const Radio = forwardRef((props: CheckboxProps, ref: React.ForwardedRef<HTMLRadioCustomElement>) => {
  const { label, alignEnd, spaceBetween, nowrap, ...checkboxProps } = props;
  const formfieldProps = createFormfieldProps({
    label,
    alignEnd,
    spaceBetween,
    nowrap,
  });
  return (
    <fwc-formfield {...formfieldProps}>
      <RadioBase ref={ref} {...checkboxProps} />
    </fwc-formfield>
  );
});

Radio.displayName = 'Radio';

export default Radio;
