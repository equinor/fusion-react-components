import React, { useEffect, useRef } from 'react';

/**
 * Simple wrapper for sharing a ref when creating element with `React.forwardRef`
 */
export const useForwardRef = <E extends HTMLElement>(
  forwardRef?: React.ForwardedRef<E>,
  initial: E | null = null
): React.RefObject<E> => {
  const ref = useRef<E>(initial);
  useEffect(() => {
    if (typeof forwardRef === 'function') {
      (forwardRef as (e: E | null) => void)(ref.current);
    } else if (forwardRef) {
      (forwardRef as { current: E | null }).current = ref.current;
    }
  }, [forwardRef, ref]);
  return ref;
};

export default useForwardRef;
