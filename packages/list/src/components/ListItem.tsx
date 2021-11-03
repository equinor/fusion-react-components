import { createComponent } from '@equinor/fusion-react-utils';
import HTMLListItemCustomElement, { tag } from '@equinor/fusion-wc-list/lib/list-item';

export { HTMLListItemCustomElement };

export type ListItemElementProps = React.PropsWithChildren<
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

export const ListItem = createComponent<HTMLListItemCustomElement, ListItemElementProps>(
  HTMLListItemCustomElement,
  tag
);
export type ListItemProps = React.ComponentProps<typeof ListItem>;

export default ListItem;
