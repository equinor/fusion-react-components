import { forwardRef } from 'react';

import { ComponentProps } from '@equinor/fusion-react-utils';

import { CheckboxBase, CheckboxBaseProps, HTMLCheckboxCustomElement } from './CheckboxBase';
import { FormField, FormFieldElementProps } from './FormField';

// TODO import from @equinor/fusion-react-form when created

export type CheckboxElementProps = CheckboxBaseProps &
  FormFieldElementProps & {
    /** Size of the checkbox */
    size?: number;
  };

export const Checkbox = forwardRef(
  (props: CheckboxElementProps, ref: React.ForwardedRef<HTMLCheckboxCustomElement>) => {
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
  },
);

export type CheckboxProps = ComponentProps<HTMLCheckboxCustomElement, CheckboxElementProps>;

Checkbox.displayName = 'Checkbox';

export default Checkbox;
