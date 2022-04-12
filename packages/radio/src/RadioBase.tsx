import { createComponent } from '@equinor/fusion-react-utils';
import { RadioElement as HTMLRadioCustomElement, tag } from '@equinor/fusion-wc-radio';

type NativeProps = Pick<
  HTMLRadioCustomElement,
  'checked' | 'disabled' | 'name' | 'reducedTouchTarget' | 'value' | 'global'
>;

type NativeRequiredProps = Partial<Pick<NativeProps, 'name'>>;

export type RadioBaseProps = NativeRequiredProps & Partial<NativeProps>;

export const RadioBase = createComponent<HTMLRadioCustomElement, RadioBaseProps>(HTMLRadioCustomElement, tag);

export { HTMLRadioCustomElement };

export default RadioBase;
