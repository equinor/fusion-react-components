import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonAvatarCustomElement, {
  tag,
  type AvatarData,
} from '@equinor/fusion-wc-person/avatar';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLPersonAvatarCustomElement,
      | 'azureId'
      | 'upn'
      | 'dataSource'
      | 'resolveId'
      | 'pictureSrc'
      | 'showLetter'
      | 'size'
      | 'clickable'
      | 'disabled'
      | 'trigger'
    >
  >
>;

export type PersonAvatarProps = ComponentProps<HTMLPersonAvatarCustomElement, ElementProps>;

export const PersonAvatar = createComponent<HTMLPersonAvatarCustomElement, ElementProps>(
  HTMLPersonAvatarCustomElement,
  tag,
);

PersonAvatar.displayName = 'PersonAvatar';

export type { HTMLPersonAvatarCustomElement, AvatarData };
export default PersonAvatar;
