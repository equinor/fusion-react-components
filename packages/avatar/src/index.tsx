import { HTMLAttributes, PropsWithChildren } from 'react';
import HTMLAvatarCustomElement, { AvatarElementProps } from '@equinor/fusion-wc-avatar';

// preserve code
HTMLAvatarCustomElement;

// reference to real element
export { HTMLAvatarCustomElement };

export type AvatarProps = AvatarElementProps & HTMLAttributes<HTMLAvatarCustomElement>;

export const Avatar = (props: PropsWithChildren<AvatarProps>) => {
  const { children, ...attr } = props;
  return <fwc-avatar {...attr}>{children}</fwc-avatar>;
};

Avatar.displayName = '@equinor/fusion-react-avatar';

export default Avatar;
