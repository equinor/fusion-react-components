import { PropsWithChildren, useState } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonListItemCustomElement, { tag } from '@equinor/fusion-wc-person/person-list-item';
import { Popover } from '@equinor/fusion-react-popover/dist';
import PersonCard from './PersonCard';

type ElementProps = PropsWithChildren<Partial<Pick<HTMLPersonListItemCustomElement, 'azureId' | 'size' | 'clickable'>>>;

export type PersonListItemProps = ComponentProps<HTMLPersonListItemCustomElement, ElementProps>;
export const PersonListItemComponent = createComponent<HTMLPersonListItemCustomElement, ElementProps>(
  HTMLPersonListItemCustomElement,
  tag
);

export const PersonListItem = ({ children, ...props }: PropsWithChildren<PersonListItemProps>): JSX.Element => {
  const [visible, setVisibility] = useState<boolean>(false);

  if (!props.clickable) return <PersonListItemComponent {...props}>{children}</PersonListItemComponent>;

  return (
    <Popover
      baseElement={<PersonListItemComponent {...props}>{children}</PersonListItemComponent>}
      strategy="fixed"
      placement="bottom-start"
      visible={visible}
      setVisibility={setVisibility}
      showCloseIcon={false}
    >
      <PersonCard azureId={props.azureId} />
    </Popover>
  );
};

export default PersonListItem;
