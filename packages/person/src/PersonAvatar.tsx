import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonAvatarCustomElement, { tag, AvatarSize } from '@equinor/fusion-wc-person/person-avatar';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonAvatarCustomElement, 'azureId' | 'size' | 'clickable' | 'disabled'>>
>;

export type PersonAvatarProps = ComponentProps<HTMLPersonAvatarCustomElement, ElementProps>;
export const PersonAvatar = createComponent<HTMLPersonAvatarCustomElement, ElementProps>(
  HTMLPersonAvatarCustomElement,
  tag
);

export { HTMLPersonAvatarCustomElement, AvatarSize };
export default PersonAvatar;
