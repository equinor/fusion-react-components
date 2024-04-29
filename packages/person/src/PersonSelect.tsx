import { BaseSyntheticEvent, PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonSelectCustomElement, {
  tag,
  PersonSelectEvent as HTMLPersonSelectEvent,
  PersonSelectElementProps,
} from '@equinor/fusion-wc-person/select';

type ElementAtts = PropsWithChildren<
  Partial<
    Pick<
      PersonSelectElementProps,
      | 'autofocus'
      | 'disabled'
      | 'dropdownHeight'
      | 'graphic'
      | 'initialText'
      | 'label'
      | 'leadingIcon'
      | 'meta'
      | 'multiple'
      | 'placeholder'
      | 'selectedId'
      | 'selectedPerson'
      | 'value'
      | 'variant'
    >
  >
>;

export type PersonSelectEvent = BaseSyntheticEvent<HTMLPersonSelectEvent>;

type ElementEvents = {
  onSelect?: (e: PersonSelectEvent) => void;
  onDropdownClosed?: (e: CustomEvent) => void;
};

type ElementProps = ElementAtts & ElementEvents;

export type PersonSelectProps = ComponentProps<HTMLPersonSelectCustomElement, ElementProps>;

export const PersonSelectComponent = createComponent<HTMLPersonSelectCustomElement, ElementProps>(
  HTMLPersonSelectCustomElement,
  tag,
  { events: { onSelect: 'select', onDropdownClosed: 'dropdownClosed' } },
);

export const PersonSelect = ({ children, ...props }: PropsWithChildren<PersonSelectProps>) => {
  return <PersonSelectComponent {...props}>{children}</PersonSelectComponent>;
};

export default PersonSelect;
