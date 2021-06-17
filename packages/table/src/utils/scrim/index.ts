import { RefObject, useEffect, useRef } from 'react';

export const isScrim = (node: Node) => (e: Event): boolean => !e.composedPath().includes(node);

export const scrimClick = (node: Node, cb: VoidFunction) => (e: Event): void => {
  isScrim(node)(e) && cb();
};

/**
 * Hook for detecting scrim clicks
 * @param cb - CAUTION - needs to be memoized!
 */
export const useScrimClickRef = <TElement extends HTMLElement = HTMLElement>(
  props: { cb: VoidFunction; disabled?: boolean; ref: RefObject<TElement> },
  deps: unknown[] = []
): void => {
  const { cb, disabled, ref } = props;
  useEffect(() => {
    // early exit
    if (disabled || !ref.current) return;
    const onScrimClick = scrimClick(ref.current, cb);
    document.addEventListener('click', onScrimClick);
    return () => document.removeEventListener('click', onScrimClick);
  }, [cb, disabled, ref, ...deps]);
};

/**
 * Hook for detecting scrim clicks
 * Creates and return an ref
 * @param cb - CAUTION - needs to be memoized!
 */
export const useScrimClick = <TElement extends HTMLElement = HTMLElement>(
  cb: VoidFunction,
  disabled?: boolean,
  deps: unknown[] = []
): RefObject<TElement> => {
  const ref = useRef<TElement>(null);
  useScrimClickRef({ cb, ref, disabled }, deps);
  return ref;
};
