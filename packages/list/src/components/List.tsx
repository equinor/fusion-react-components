import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import { ListElement as HTMLListCustomElement, tag } from '@equinor/fusion-wc-list';

export { HTMLListCustomElement };

export const List = createComponent(ReactModule, tag, HTMLListCustomElement);
export type ListProps = React.ComponentProps<typeof List>;

export default List;
