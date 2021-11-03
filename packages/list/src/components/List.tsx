import { createComponent } from '@equinor/fusion-react-utils';
import HTMLListCustomElement, { tag } from '@equinor/fusion-wc-list';

export { HTMLListCustomElement };

export type ListElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLListCustomElement,
      | 'activatable'
      | 'multi'
      | 'emptyMessage'
      | 'wrapFocus'
      | 'itemRoles'
      | 'innerRole'
      | 'innerAriaLabel'
      | 'rootTabbable'
      | 'noninteractive'
    >
  >
>;

export const List = createComponent<HTMLListCustomElement, ListElementProps>(HTMLListCustomElement, tag);
export type ListProps = React.ComponentProps<typeof List>;

export default List;
