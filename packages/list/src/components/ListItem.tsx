import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLListItemCustomElement, { tag } from '@equinor/fusion-wc-list/lib/list-item';

export type ElementProps = React.PropsWithChildren<
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

export const ListItem = createComponent<HTMLListItemCustomElement, ElementProps>(HTMLListItemCustomElement, tag);
export type ListItemProps = ComponentProps<HTMLListItemCustomElement, ElementProps>;

export { HTMLListItemCustomElement };

export default ListItem;
