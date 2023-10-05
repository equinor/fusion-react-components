import { ForwardedRef, forwardRef } from 'react';
import { RadioBase, RadioBaseProps, HTMLRadioCustomElement } from './RadioBase';
import { FormField, FormFieldElementProps } from './FormField';
import { ComponentProps } from '@equinor/fusion-react-utils';

export type RadioElementProps = RadioBaseProps &
  FormFieldElementProps & {
    /** Size of the radios */
    readonly size?: number;
  };

export const Radio: React.FC<RadioElementProps> = forwardRef(
  (props: RadioElementProps, ref: ForwardedRef<HTMLRadioCustomElement>) => {
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
  },
);

export type RadioProps = ComponentProps<HTMLRadioCustomElement, RadioElementProps>;

Radio.displayName = 'Radio';

export default Radio;
