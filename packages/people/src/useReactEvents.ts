import { useCallback, useEffect, type RefObject } from 'react';
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
  // Reemit event as SelectionChangedEvent
  const handleSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      if (onSelectionChanged) {
        onSelectionChanged(event);
      }
    },
    [onSelectionChanged],
  );

  // Reemit event as PersonAddedEvent
  const handlePersonAdded = useCallback(
    (event: PersonAddedEvent) => {
      if (onPersonAdded) {
        onPersonAdded(event);
      }
    },
    [onPersonAdded],
  );

  // Reemit event as PersonRemovedEvent
  const handlePersonRemoved = useCallback(
    (event: PersonRemovedEvent) => {
      if (onPersonRemoved) {
        onPersonRemoved(event);
      }
    },
    [onPersonRemoved],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.addEventListener('selection-changed', handleSelectionChanged as EventListener);
    element.addEventListener('person-added', handlePersonAdded as EventListener);
    element.addEventListener('person-removed', handlePersonRemoved as EventListener);

    return () => {
      element.removeEventListener('selection-changed', handleSelectionChanged as EventListener);
      element.removeEventListener('person-added', handlePersonAdded as EventListener);
      element.removeEventListener('person-removed', handlePersonRemoved as EventListener);
    };
  }, [handleSelectionChanged, handlePersonAdded, handlePersonRemoved, ref]);
};
