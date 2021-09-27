import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLCheckboxCustomElement, { tag } from '@equinor/fusion-wc-checkbox';

export { HTMLCheckboxCustomElement };

export const CheckboxBase = createComponent(ReactModule, tag, HTMLCheckboxCustomElement);

export default CheckboxBase;
