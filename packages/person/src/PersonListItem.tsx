import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonListItemCustomElement, { tag, type ListItemData } from '@equinor/fusion-wc-person/list-item';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonListItemCustomElement, 'azureId' | 'upn' | 'dataSource' | 'size' | 'clickable'>>
>;

export type PersonListItemProps = ComponentProps<HTMLPersonListItemCustomElement, ElementProps>;
export const PersonListItem = createComponent<HTMLPersonListItemCustomElement, ElementProps>(
  HTMLPersonListItemCustomElement,
  tag,
);

export type { ListItemData, HTMLPersonListItemCustomElement };
export default PersonListItem;
