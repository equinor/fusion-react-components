import { forwardRef } from 'react';
import { RadioBase, HTMLRadioCustomElement } from './RadioBase';
import { FormField, FormFieldProps } from './FormField';

export type RadioProps = React.ComponentProps<typeof RadioBase> &
  FormFieldProps & {
    /** Size of the radio */
    size?: number;
  };

export const Radio = forwardRef((props: RadioProps, ref: React.ForwardedRef<HTMLRadioCustomElement>) => {
  const { label, alignEnd, spaceBetween, nowrap, className, size, slot, ...radioProps } = props;
  const formfieldProps = {
    label,
    alignEnd,
    spaceBetween,
    nowrap,
    slot,
  };
  radioProps.style ??= {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  size && (radioProps.style['--fwc-radio-size'] = size + 'px');
  return (
    <FormField className={className} {...formfieldProps}>
      <RadioBase ref={ref} {...radioProps} />
    </FormField>
  );
});

Radio.displayName = 'Radio';

export default Radio;
