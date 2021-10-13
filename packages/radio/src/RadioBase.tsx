import { createComponent } from '@equinor/fusion-react-utils';
import { RadioElement as HTMLRadioCustomElement, tag } from '@equinor/fusion-wc-radio';

export type RadioBaseProps = Partial<
  Pick<HTMLRadioCustomElement, 'checked' | 'disabled' | 'name' | 'reducedTouchTarget' | 'value'>
>;

export const RadioBase = createComponent<HTMLRadioCustomElement, RadioBaseProps>(HTMLRadioCustomElement, tag, {
  // add checked since this is a get/set
  functions: new Set(['checked']),
});

export { HTMLRadioCustomElement };

export default RadioBase;
