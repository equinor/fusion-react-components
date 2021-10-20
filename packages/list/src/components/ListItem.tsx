import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import { ListItemElement as HTMLListItemCustomElement, tag } from '@equinor/fusion-wc-list/lib/list-item';

export { HTMLListItemCustomElement };

export const ListItem = createComponent(ReactModule, tag, HTMLListItemCustomElement);
export type ListItemProps = React.ComponentProps<typeof ListItem>;

export default ListItem;
