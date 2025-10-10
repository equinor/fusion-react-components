import { useLayoutEffect, useRef } from 'react';

import type { ForwardedRef, RefObject } from 'react';

/**
 * Simple wrapper for sharing a ref when creating element with `React.forwardRef`
 */
export const useForwardRef = <E extends HTMLElement>(
  forwardRef?: ForwardedRef<E>,
  initial: E | null = null,
): RefObject<E | null> => {
  const ref = useRef<E>(initial);
  useLayoutEffect(() => {
    if (typeof forwardRef === 'function') {
      (forwardRef as (e: E | null) => void)(ref.current);
    } else if (forwardRef) {
      (forwardRef as { current: E | null }).current = ref.current;
    }
  }, [forwardRef]);
  return ref;
};

export default useForwardRef;
