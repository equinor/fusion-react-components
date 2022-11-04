import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCardCustomElement, { tag, AvatarSize } from '@equinor/fusion-wc-person/person-card';

type ElementProps = PropsWithChildren<Partial<Pick<HTMLPersonCardCustomElement, 'azureId' | 'size'>>>;

export type PersonCardProps = ComponentProps<HTMLPersonCardCustomElement, ElementProps>;
export const PersonCard = createComponent<HTMLPersonCardCustomElement, ElementProps>(HTMLPersonCardCustomElement, tag);

export { HTMLPersonCardCustomElement, AvatarSize };
export default PersonCard;
