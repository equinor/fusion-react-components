import { createComponent } from '@equinor/fusion-react-utils';
import HTMLAvatarCustomElement, { tag } from '@equinor/fusion-wc-avatar';

export { HTMLAvatarCustomElement };

export type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLAvatarCustomElement, 'value' | 'border' | 'size' | 'src' | 'clickable'>>
>;

export const Avatar = createComponent<HTMLAvatarCustomElement, ElementProps>(HTMLAvatarCustomElement, tag);
export type AvatarProps = React.ComponentProps<typeof Avatar>;

export default Avatar;
