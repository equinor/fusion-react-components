import { forwardRef } from 'react';

import { SwitchBase, HTMLSwitchCustomElement, SwitchBaseProps } from './SwitchBase';
import { FormField, ElementProps as FormFieldProps } from './FormField';
import { ComponentProps } from '@equinor/fusion-react-utils';

// TODO import from @equinor/fusion-react-form when created

type ElementProps = SwitchBaseProps &
  FormFieldProps & {
    /** Size of the checkbox */
    // size?: number;
  };

// TODO - fix sizing of switch element
// TODO - Emit change on switch

export const Switch = forwardRef((props: ElementProps, ref: React.ForwardedRef<HTMLSwitchCustomElement>) => {
  const { label, alignEnd, spaceBetween, nowrap, className, slot, ...switchProps } = props;
  const formfieldProps = {
    label,
    alignEnd,
    spaceBetween,
    nowrap,
    slot,
  };
  switchProps.style ??= {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // size && (checkboxProps.style['--fwc-checkbox-size'] = size + 'px');
  return (
    <FormField className={className} {...formfieldProps}>
      <SwitchBase ref={ref} {...switchProps} />
    </FormField>
  );
});

export type SwitchProps = ComponentProps<HTMLSwitchCustomElement, ElementProps>;

Switch.displayName = 'Switch';

export default Switch;
