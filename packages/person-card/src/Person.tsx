import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCustomElement, { tag } from '@equinor/fusion-wc-person/person-card';
import { AvatarSize } from '@equinor/fusion-wc-avatar';

type ElementProps = PropsWithChildren<Partial<Pick<HTMLPersonCustomElement, 'azureId' | 'size'>>>;

export type PersonProps = ComponentProps<HTMLPersonCustomElement, ElementProps>;
export const Person = createComponent<HTMLPersonCustomElement, ElementProps>(HTMLPersonCustomElement, tag);

export { HTMLPersonCustomElement, AvatarSize };
export default Person;
