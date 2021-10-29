import { createComponent } from '@equinor/fusion-react-utils';
import HTMLCheckListItemCustomElement, { tag } from '@equinor/fusion-wc-list/lib/check-list-item';

export { HTMLCheckListItemCustomElement };

export type CheckListItemElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLCheckListItemCustomElement,
      | 'left'
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

export const CheckListItem = createComponent<HTMLCheckListItemCustomElement, CheckListItemElementProps>(
  HTMLCheckListItemCustomElement,
  tag
);
export type CheckListItemProps = React.ComponentProps<typeof CheckListItem>;

export default CheckListItem;
