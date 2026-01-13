import { useRef, type PropsWithChildren, type ReactElement } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import {
  PeopleViewerElement,
  peopleViewerTag,
  type SelectionChangedEvent,
  type PersonAddedEvent,
  type PersonRemovedEvent,
} from '@equinor/fusion-wc-people';
import { useReactEvents } from './useReactEvents';

type ElementAttributes = PropsWithChildren<
  Partial<
    Pick<
      PeopleViewerElement,
      'value' | 'resolveIds' | 'people' | 'subtitle' | 'tableColumns' | 'viewMode' | 'showViewMode'
    >
  >
>;

type ElementEvents = {
  onPersonAdded?: (e: PersonAddedEvent) => void;
  onPersonRemoved?: (e: PersonRemovedEvent) => void;
  onSelectionChanged?: (e: SelectionChangedEvent) => void;
};

type ElementProps = ElementAttributes & ElementEvents;

export type PeopleViewerProps = ComponentProps<PeopleViewerElement, ElementProps>;

const PeopleViewerComponent = createComponent<PeopleViewerElement, ElementProps>(
  PeopleViewerElement,
  peopleViewerTag,
  {
    events: {
      onPersonAdded: 'person-added',
      onPersonRemoved: 'person-removed',
      onSelectionChanged: 'selection-changed',
    },
  },
);

export const PeopleViewer = (props: PeopleViewerProps): ReactElement => {
  const { onPersonAdded, onPersonRemoved, onSelectionChanged, ...atts } = props;
  const ref = useRef<PeopleViewerElement | null>(null);
  useReactEvents(ref, onSelectionChanged, onPersonAdded, onPersonRemoved);

  return <PeopleViewerComponent ref={ref} {...atts} />;
};

export default PeopleViewer;
