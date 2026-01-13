import { useEffect, type RefObject } from 'react';
import type {
  PersonAddedEvent,
  PersonRemovedEvent,
  SelectionChangedEvent,
} from '@equinor/fusion-wc-people';

export const useReactEvents = (
  ref: RefObject<HTMLElement | null>,
  onSelectionChanged?: (e: SelectionChangedEvent) => void,
  onPersonAdded?: (e: PersonAddedEvent) => void,
  onPersonRemoved?: (e: PersonRemovedEvent) => void,
): void => {
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Reemit event as SelectionChangedEvent
    const handleSelectionChanged = (event: Event) => {
      const e = event as SelectionChangedEvent;
      if (onSelectionChanged) {
        onSelectionChanged(e);
      }
    };

    // Reemit event as PersonAddedEvent
    const handlePersonAdded = (event: Event) => {
      const e = event as PersonAddedEvent;
      if (onPersonAdded) {
        onPersonAdded(e);
      }
    };

    // Reemit event as PersonRemovedEvent
    const handlePersonRemoved = (event: Event) => {
      const e = event as PersonRemovedEvent;
      if (onPersonRemoved) {
        onPersonRemoved(e);
      }
    };

    // attach event listeners
    element.addEventListener('selection-changed', handleSelectionChanged);
    element.addEventListener('person-added', handlePersonAdded);
    element.addEventListener('person-removed', handlePersonRemoved);

    // cleanup function to remove event listeners
    return () => {
      element.removeEventListener('selection-changed', handleSelectionChanged);
      element.removeEventListener('person-added', handlePersonAdded);
      element.removeEventListener('person-removed', handlePersonRemoved);
    };
  }, [ref, onSelectionChanged, onPersonAdded, onPersonRemoved]);
};
