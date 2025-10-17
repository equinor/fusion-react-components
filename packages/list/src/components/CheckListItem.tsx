import type { PropsWithChildren } from 'react';
import { createComponent, type ComponentProps } from '@equinor/fusion-react-utils';
import {
  CheckListItemElement as HTMLCheckListItemCustomElement,
  checkListItemTag as tag,
} from '@equinor/fusion-wc-list';

type ElementProps = PropsWithChildren<
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

export const CheckListItem = createComponent<HTMLCheckListItemCustomElement, ElementProps>(
  HTMLCheckListItemCustomElement,
  tag,
);

export type CheckListItemProps = ComponentProps<HTMLCheckListItemCustomElement, ElementProps>;

export { HTMLCheckListItemCustomElement };

export default CheckListItem;
