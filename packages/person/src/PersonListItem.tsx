import { PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonListItemCustomElement, { tag, ListItemData } from '@equinor/fusion-wc-person/list-item';
import extractProps from './extract-props';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonListItemCustomElement, 'azureId' | 'upn' | 'dataSource' | 'size' | 'clickable'>>
>;

export type PersonListItemProps = ComponentProps<HTMLPersonListItemCustomElement, ElementProps>;
export const PersonListItemComponent = createComponent<HTMLPersonListItemCustomElement, ElementProps>(
  HTMLPersonListItemCustomElement,
  tag,
);

export const PersonListItem = ({ children, ...props }: PropsWithChildren<PersonListItemProps>): JSX.Element => {
  const avatarRef = useRef<HTMLPersonListItemCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (avatarRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        avatarRef.current[name] = value;
      }
    }
  }, []);

  return <PersonListItemComponent ref={avatarRef}>{children}</PersonListItemComponent>;
};

export { ListItemData };
export default PersonListItem;
