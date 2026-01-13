import {
  type BaseSyntheticEvent,
  useRef,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useEffect,
} from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import {
  PeoplePickerElement,
  peoplePickerTag,
  type PersonAddedEvent,
  type PersonRemovedEvent,
  type SelectionChangedEvent,
} from '@equinor/fusion-wc-people';
import { useReactEvents } from './useReactEvents';

type ElementAttributes = PropsWithChildren<
  Partial<
    Pick<
      PeoplePickerElement,
      | 'value'
      | 'resolveIds'
      | 'people'
      | 'subtitle'
      | 'secondarySubtitle'
      | 'placeholder'
      | 'multiple'
      | 'showSelectedPeople'
    >
  >
>;

type ElementEvents = {
  onPersonAdded?: (e: PersonAddedEvent) => void;
  onPersonRemoved?: (e: PersonRemovedEvent) => void;
  onSelectionChanged?: (e: SelectionChangedEvent) => void;
};

type ElementProps = ElementAttributes & ElementEvents;

export type PeoplePickerProps = ComponentProps<PeoplePickerElement, ElementProps>;

const PeoplePickerComponent = createComponent<PeoplePickerElement, ElementProps>(
  PeoplePickerElement,
  peoplePickerTag,
  {
    events: {
      onPersonAdded: 'person-added',
      onPersonRemoved: 'person-removed',
      onSelectionChanged: 'selection-changed',
    },
  },
);

export const PeoplePicker = (props: PeoplePickerProps): ReactElement => {
  const { onSelectionChanged, onPersonAdded, onPersonRemoved, ...atts } = props;
  const ref = useRef<PeoplePickerElement | null>(null);

  useReactEvents(ref, onSelectionChanged, onPersonAdded, onPersonRemoved);

  return <PeoplePickerComponent ref={ref} {...atts} />;
};

export default PeoplePicker;
