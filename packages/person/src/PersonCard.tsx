import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCardCustomElement, { tag, CardData } from '@equinor/fusion-wc-person/card';
import { PersonItemSize } from '@equinor/fusion-wc-person';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonCardCustomElement, 'azureId' | 'upn' | 'dataSource' | 'size' | 'maxWidth' | 'contentHeight'>>
>;

export type PersonCardProps = ComponentProps<HTMLPersonCardCustomElement, ElementProps>;
export const PersonCard = createComponent<HTMLPersonCardCustomElement, ElementProps>(HTMLPersonCardCustomElement, tag);

export { type HTMLPersonCardCustomElement, type PersonItemSize, type CardData };
export default PersonCard;
