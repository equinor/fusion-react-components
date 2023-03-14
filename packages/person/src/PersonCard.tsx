import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCardCustomElement, { tag } from '@equinor/fusion-wc-person/person-card';
import { PersonItemSize } from '@equinor/fusion-wc-person';

type ElementProps = PropsWithChildren<Partial<Pick<HTMLPersonCardCustomElement, 'azureId' | 'size'>>>;

export type PersonCardProps = ComponentProps<HTMLPersonCardCustomElement, ElementProps>;
export const PersonCard = createComponent<HTMLPersonCardCustomElement, ElementProps>(HTMLPersonCardCustomElement, tag);

export { HTMLPersonCardCustomElement, PersonItemSize };
export default PersonCard;
