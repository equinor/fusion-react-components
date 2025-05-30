/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';

import { shallowEqual } from '../shallow-equal';

const noFns = {};

/**
 * Works lie `useProps` but will check if prop/function has changed before assignment
 * @param ref
 * @param functions
 * @param functionMap
 */
export const useElementFunctions = <
  E extends HTMLElement,
  EKey extends string = Extract<keyof E, string>,
>(
  ref: RefObject<E | null>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  functions?: Partial<Record<EKey, any>>,
  functionMap?: Set<keyof E>,
): void => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type ERecord = Record<EKey, any>;
  const fnsRef = useRef<ERecord>({} as ERecord);

  const fns = useMemo(() => {
    /** early escaping no-op */
    if (!functions || !functionMap) return noFns as ERecord;

    // extract allowed functions
    const fns = [...functionMap.values()]
      .filter((k) => k in functions)
      .reduce((c, v) => Object.assign(c, { [v]: functions[v as EKey] }), {} as ERecord);

    /** compare functions with existing */
    const hasChanged = !shallowEqual(fnsRef.current, fns);
    return hasChanged ? fns : fnsRef.current;
  }, [functions, functionMap]);

  useLayoutEffect(() => {
    const obj = ref.current;
    if (!obj || !fns) return;

    for (const fnKey in fns) {
      obj[fnKey as keyof E] = fns[fnKey];
    }
    fnsRef.current = fns;
  }, [ref, fns]);
};
