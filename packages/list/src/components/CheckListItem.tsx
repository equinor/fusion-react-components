import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import {
  CheckListItemElement as HTMLCheckListItemCustomElement,
  tag,
} from '@equinor/fusion-wc-list/lib/check-list-item';

export { HTMLCheckListItemCustomElement };

export const CheckListItem = createComponent(ReactModule, tag, HTMLCheckListItemCustomElement);
export type CheckListItemProps = React.ComponentProps<typeof CheckListItem>;

export default CheckListItem;
