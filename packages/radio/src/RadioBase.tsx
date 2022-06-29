import { createComponent, ComponentProps } from '@equinor/fusion-react-utils';
import { RadioElement as HTMLRadioCustomElement, tag } from '@equinor/fusion-wc-radio';

export type NativeProps = Pick<
  HTMLRadioCustomElement,
  'checked' | 'disabled' | 'name' | 'reducedTouchTarget' | 'value' | 'global'
>;

export type NativeRequiredProps = Required<Pick<NativeProps, 'name'>>;

export type RadioBaseElementProps = NativeRequiredProps & Partial<NativeProps>;

export const RadioBase = createComponent<HTMLRadioCustomElement, RadioBaseElementProps>(HTMLRadioCustomElement, tag, {
  functions: new Set(['checked', 'disabled', 'name', 'reducedTouchTarget', 'value', 'global']),
});

export type RadioBaseProps = ComponentProps<HTMLRadioCustomElement, RadioBaseElementProps>;

export { HTMLRadioCustomElement };

export default RadioBase;
