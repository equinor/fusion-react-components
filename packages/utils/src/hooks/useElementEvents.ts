import { useLayoutEffect, useMemo, useRef } from 'react';
import type { EventHandler, ReactEventHandler, RefObject, SyntheticEvent } from 'react';

import { createSyntheticEvent } from '../create-synthetic-event';
import { shallowEqual } from '../shallow-equal';

const noEvents = {};

/**
 * Add event listeners to a native element
 * @param ref React ref object of native element
 * @param eventHandlers handler to attach to element, must match map (normally props of component)
 * @param eventMap Map of events where key is prop name and value is event name
 */
export const useElementEvents = <
  E extends HTMLElement,
  K extends string,
  P extends Partial<Record<K, EventHandler<SyntheticEvent<E, Event>>>>,
>(
  ref: RefObject<E>,
  eventHandlers?: P,
  eventMap: Record<K, string> = {} as Record<K, string>,
): void => {
  /** keep a reference of all registered events */
  const listenersRef = useRef<Partial<Record<K, EventListener>>>({} as Record<K, EventListener>);

  /** keep a reference of all registered event handler */
  const handlersRef = useRef<Partial<Record<K, ReactEventHandler>>>(
    {} as Record<K, ReactEventHandler>,
  );

  /** memorize provided event handlers provided by component properties */
  const handlers = useMemo<Partial<Record<K, ReactEventHandler>>>(() => {
    /** early exit, no props provided */
    if (!eventHandlers) return noEvents;

    /** extract properties that are defined as custom event handlers */
    const handlers: Partial<Record<K, ReactEventHandler>> = {};
    for (const key of Object.keys(eventMap)) {
      if (key in eventHandlers) {
        handlers[key as K] = eventHandlers[key as keyof P];
      }
    }

    /** compare event handlers with existing */
    const hasChanged = !shallowEqual(handlersRef.current, handlers);

    /** only return if event handlers has changes */
    return hasChanged ? handlers : handlersRef.current;
  }, [eventMap, eventHandlers]);

  /**
   * Check for changes in event handlers as an side effect
   * No teardown since registered event listeners create synthetic react events that access
   * the referenced callback. We also assume that when this component, the event target is also
   * unmounted and do not need teardown.
   */
  useLayoutEffect(() => {
    if (!handlers) return;
    const listeners = listenersRef.current;
    const propKeys = Object.keys(eventMap).filter((k) => k in handlers);
    /** register all new events */
    for (const propKey of propKeys) {
      if (!(propKey in listeners)) {
        /** internal callback that generate synthetic event that reference provided callback  */
        const eventListener = (e: Event) => {
          const handler = handlersRef.current[propKey as K];
          handler?.(createSyntheticEvent(e));
        };

        console.debug(`adding event listener [${propKey}]`, ref.current);

        /** register listener and add to index */
        ref.current?.addEventListener(eventMap[propKey as K], eventListener);
        Object.assign(listeners, { [propKey]: eventListener });
      }
    }

    /** generate list over events removed in props */
    const removed = Object.keys(listeners).filter((k) => !(k in handlers));
    for (const key of removed) {
      console.debug(`removing event listener [${key}]`, ref.current);
      const type = eventMap[key as K];
      const handler = listeners[key as K];
      if (type) {
        handler && ref.current?.removeEventListener(type, handler);
        delete listeners[key as K];
      }
    }

    /** assign indexes to reference */
    listenersRef.current = listeners;
    handlersRef.current = handlers;
  }, [eventMap, ref, handlers]);
};

export default useElementEvents;
