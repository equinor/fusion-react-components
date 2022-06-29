import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLAvatarCustomElement, { tag } from '@equinor/fusion-wc-avatar';

export { HTMLAvatarCustomElement };

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLAvatarCustomElement, 'value' | 'border' | 'size' | 'src' | 'clickable'>>
>;

export const Avatar = createComponent<HTMLAvatarCustomElement, ElementProps>(HTMLAvatarCustomElement, tag);
export type AvatarProps = ComponentProps<HTMLAvatarCustomElement, ElementProps>;

export default Avatar;
