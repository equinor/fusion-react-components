import { PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonAvatarCustomElement, { tag, AvatarSize, AvatarData } from '@equinor/fusion-wc-person/avatar';
import extractProps from './extract-props';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonAvatarCustomElement, 'azureId' | 'upn' | 'dataSource' | 'size' | 'clickable' | 'disabled' | 'showFloatingOn'>>
>;

export type PersonAvatarProps = ComponentProps<HTMLPersonAvatarCustomElement, ElementProps>;

const PersonAvatarComponent = createComponent<HTMLPersonAvatarCustomElement, ElementProps>(
  HTMLPersonAvatarCustomElement,
  tag
);

export const PersonAvatar = ({ children, ...props }: PropsWithChildren<PersonAvatarProps>): JSX.Element => {
  const avatarRef = useRef<HTMLPersonAvatarCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (avatarRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        avatarRef.current[name] = value;
      }
    }
  }, []);

  return <PersonAvatarComponent ref={avatarRef}>{children}</PersonAvatarComponent>;
};

export { AvatarSize, AvatarData };
export default PersonAvatar;
