import type { BaseSyntheticEvent, PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonSelectCustomElement, {
  tag,
  type PersonSelectEvent as HTMLPersonSelectEvent,
  type PersonSelectElementProps,
} from '@equinor/fusion-wc-person/select';

type ElementAttributes = PropsWithChildren<
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

type ElementProps = ElementAttributes & ElementEvents;

export type PersonSelectProps = ComponentProps<HTMLPersonSelectCustomElement, ElementProps>;

export const PersonSelect = createComponent<HTMLPersonSelectCustomElement, ElementProps>(
  HTMLPersonSelectCustomElement,
  tag,
  { events: { onSelect: 'select', onDropdownClosed: 'dropdownClosed' } },
);

export default PersonSelect;
