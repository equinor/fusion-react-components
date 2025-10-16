import type { SyntheticEvent } from 'react';

/**
 * Create a wrapper event for React
 * @param event Event - native/custom event
 */
export const createSyntheticEvent = <T extends Element = HTMLElement, E extends Event = Event>(
  event: E,
): SyntheticEvent<T, E> => {
  let isPropagationStopped = false;
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault: () => event.preventDefault(),
    isDefaultPrevented: () => event.defaultPrevented,
    stopPropagation: () => {
      isPropagationStopped = true;
      event.stopPropagation();
    },
    isPropagationStopped: () => isPropagationStopped,
    persist: () => undefined,
    timeStamp: event.timeStamp,
    type: event.type,
  };
};
