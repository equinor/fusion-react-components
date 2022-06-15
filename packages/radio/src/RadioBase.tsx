import type { ComponentProps } from 'react';

import { createComponent } from '@equinor/fusion-react-utils';
import { RadioElement as HTMLRadioCustomElement, tag } from '@equinor/fusion-wc-radio';

type NativeProps = Pick<
  HTMLRadioCustomElement,
  'checked' | 'disabled' | 'name' | 'reducedTouchTarget' | 'value' | 'global'
>;

type NativeRequiredProps = Partial<Pick<NativeProps, 'name'>>;

type ElementProps = NativeRequiredProps & Partial<NativeProps>;

export const RadioBase = createComponent<HTMLRadioCustomElement, ElementProps>(HTMLRadioCustomElement, tag, {
  functions: new Set(['checked', 'disabled', 'name', 'reducedTouchTarget', 'value', 'global']),
});

export type RadioBaseProps = ComponentProps<typeof RadioBase>;

export { HTMLRadioCustomElement };

export default RadioBase;
