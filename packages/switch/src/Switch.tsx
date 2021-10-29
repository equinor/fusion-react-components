import { forwardRef } from 'react';

import { SwitchBase, HTMLSwitchCustomElement } from './SwitchBase';
import { FormField, FormFieldProps } from './FormField';

// TODO import from @equinor/fusion-react-form when created

export type SwitchProps = React.ComponentProps<typeof SwitchBase> &
  FormFieldProps & {
    /** Size of the checkbox */
    // size?: number;
  };

// TODO - fix sizing of switch element
// TODO - Emit change on switch

export const Switch = forwardRef((props: SwitchProps, ref: React.ForwardedRef<HTMLSwitchCustomElement>) => {
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

Switch.displayName = 'Switch';

export default Switch;
