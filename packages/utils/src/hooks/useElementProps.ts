/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';

type Constructor<T> = { new (): T };

const reservedReactProperties = new Set(['children', 'localName', 'ref', 'style', 'className']);

/**
 * Extract property names of `custom element`
 * NOTE: does not extract events and functions
 */
export const extractElementProps = <E extends HTMLElement>(
  elementClass: Constructor<E>,
): Set<keyof E> => {
  const elementClassProps = new Set<keyof E>();
  for (const p in elementClass.prototype) {
    if (!(p in HTMLElement.prototype)) {
      if (reservedReactProperties.has(p)) {
        console.warn(
          `${elementClass.name} contains property ${p} which is a React reserved property. It will be used by React and not set on the element.`,
        );
      } else {
        elementClassProps.add(p as keyof E);
      }
    }
  }
  return elementClassProps;
};

/**
 * React will try to `toString` all arguments that are provided.
 * This hook will set the property/function to the referenced element programmatically.
 */
export const useElementProps = <E extends HTMLElement>(
  ref: RefObject<E | null>,
  // biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
  props?: Partial<Record<string, any>>,
  propMap?: Set<keyof E>,
): void => {
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && propMap && props) {
      const elementProps = Object.entries(props).filter(([k]) => propMap.has(k as keyof E));
      for (const [k, v] of elementProps) {
        el[k as keyof E] = v;
      }
    }
  }, [ref, propMap, props]);
};
