import { useEffect } from 'react';

// TODO @odinr - move to util lib

export default <T extends EventListenerOrEventListenerObject>(
  node: HTMLElement | Window | null,
  eventType: string,
  handler: T,
  dependencies: any[],
  useCapture = false
): void => {
  useEffect(() => {
    if (node == null) {
      return;
    }

    node.addEventListener(eventType, handler, useCapture);

    return () => {
      node.removeEventListener(eventType, handler, useCapture);
    };
  }, [node, ...dependencies]);
};
