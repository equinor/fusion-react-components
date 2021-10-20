import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import {
  RadioListItemElement as HTMLRadioListItemCustomElement,
  tag,
} from '@equinor/fusion-wc-list/lib/radio-list-item';

export { HTMLRadioListItemCustomElement };

export const RadioListItem = createComponent(ReactModule, tag, HTMLRadioListItemCustomElement);
export type RadioListItemProps = React.ComponentProps<typeof RadioListItem>;

export default RadioListItem;
