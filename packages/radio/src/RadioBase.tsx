import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import { RadioElement as HTMLRadioCustomElement, tag } from '@equinor/fusion-wc-radio';

export { HTMLRadioCustomElement };

export const RadioBase = createComponent(ReactModule, tag, HTMLRadioCustomElement);

export default RadioBase;
