import { forwardRef } from 'react';

import { CheckboxBase, HTMLCheckboxCustomElement } from './CheckboxBase';
import { FormField, FormFieldProps } from './FormField';

// TODO import from @equinor/fusion-react-form when created

export type CheckboxProps = React.ComponentProps<typeof CheckboxBase> &
  FormFieldProps & {
    /** Size of the checkbox */
    size?: number;
  };

export const Checkbox = forwardRef((props: CheckboxProps, ref: React.ForwardedRef<HTMLCheckboxCustomElement>) => {
  const { label, alignEnd, spaceBetween, nowrap, className, size, slot, ...checkboxProps } = props;
  const formfieldProps = {
    label,
    alignEnd,
    spaceBetween,
    nowrap,
    slot,
  };
  checkboxProps.style ??= {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  size && (checkboxProps.style['--fwc-checkbox-size'] = size + 'px');
  return (
    <FormField className={className} {...formfieldProps}>
      <CheckboxBase ref={ref} {...checkboxProps} />
    </FormField>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
