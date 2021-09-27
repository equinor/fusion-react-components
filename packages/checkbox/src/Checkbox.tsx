import { forwardRef } from 'react';
import { CheckboxBase, HTMLCheckboxCustomElement } from './CheckboxBase';
import { FormfieldElementProps, FormfieldElement } from '@equinor/fusion-wc-formfield';

// TODO import from @equinor/fusion-react-form when created
FormfieldElement;
const createFormfieldProps = (props: FormfieldElementProps) =>
  Object.keys(props).reduce((cur, key) => {
    const value = props[key as keyof FormfieldElementProps];
    return value ? Object.assign(cur, { [key]: value }) : cur;
  }, {});

export type CheckboxProps = React.ComponentProps<typeof CheckboxBase> & FormfieldElementProps;

export const Checkbox = forwardRef((props: CheckboxProps, ref: React.ForwardedRef<HTMLCheckboxCustomElement>) => {
  const { label, alignEnd, spaceBetween, nowrap, ...checkboxProps } = props;
  const formfieldProps = createFormfieldProps({
    label,
    alignEnd,
    spaceBetween,
    nowrap,
  });
  return (
    <fwc-formfield {...formfieldProps}>
      <CheckboxBase ref={ref} {...checkboxProps} />
    </fwc-formfield>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
