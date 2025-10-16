import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import {
  ListItemElement as HTMLListItemCustomElement,
  listItemTag as tag,
} from '@equinor/fusion-wc-list';

export type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLListItemCustomElement,
      | 'value'
      | 'group'
      | 'tabindex'
      | 'disabled'
      | 'twoline'
      | 'activated'
      | 'graphic'
      | 'hasMeta'
      | 'noninteractive'
      | 'selected'
      | 'text'
    >
  >
>;

export const ListItem = createComponent<HTMLListItemCustomElement, ElementProps>(
  HTMLListItemCustomElement,
  tag,
);
export type ListItemProps = ComponentProps<HTMLListItemCustomElement, ElementProps>;

export { HTMLListItemCustomElement };

export default ListItem;
