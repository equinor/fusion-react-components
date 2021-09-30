import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLAvatarCustomElement, { tag } from '@equinor/fusion-wc-avatar';

export { HTMLAvatarCustomElement };

export const Avatar = createComponent(ReactModule, tag, HTMLAvatarCustomElement);
export type AvatarProps = React.ComponentProps<typeof Avatar>;

export default Avatar;
