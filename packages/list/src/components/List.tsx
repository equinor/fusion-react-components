import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLListCustomElement, { tag } from '@equinor/fusion-wc-list';

type ElementProps = PropsWithChildren<
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

export const List = createComponent<HTMLListCustomElement, ElementProps>(
  HTMLListCustomElement,
  tag,
);
export type ListProps = ComponentProps<HTMLListCustomElement, ElementProps>;

export { HTMLListCustomElement };

export default List;
