import { createElement, forwardRef, useMemo } from 'react';
import type {
  EventHandler,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  Ref,
  RefAttributes,
  RefObject,
  SyntheticEvent,
} from 'react';

import { extractElementProps, useElementEvents, useElementProps, useForwardRef } from './hooks';

export type ComponentAttributes<T = HTMLHtmlElement> = Omit<React.HTMLAttributes<T>, 'children'>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentProps<E extends HTMLElement, P = {}> = HTMLAttributes<E> &
  P & { readonly ref?: Ref<E> };

type Ctor<T> = { new (): T };

const translateReactAttribute = (k: string) => {
  switch (k) {
    /**
     * React does *not* handle `className` for custom elements
     * so coerce it to `class` so it's handled correctly.
     */
    case 'className':
      return 'class';
  }
  return k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

/** @see @link [Data Types](https://www.programiz.com/javascript/data-types) */
const SUPPORTED_REACT_PROP_TYPES = ['string', 'number', 'boolean', 'bigint'];

export type WebComponent<
  E extends HTMLElement,
  P extends Record<string, unknown>,
> = React.ForwardRefExoticComponent<PropsWithoutRef<ComponentAttributes<E> & P> & RefAttributes<E>>;

/**
 * Wraps a custom element as a React Component
 *
 * @param elementClass HTMLElement - Custom element to wrap
 * @param tag string - tag name which the element uses in DOM
 */
export const createComponent = <E extends HTMLElement, P extends Record<string, unknown>>(
  elementClass: Ctor<E>,
  tag: string,
  options: {
    events?: Record<string, string>;
    functions?: Set<keyof E>;
    displayName?: string;
  } = {},
): WebComponent<E, P> => {
  type EventProps = Partial<Record<keyof E, EventHandler<SyntheticEvent<E, Event>>>>;

  const { events = {}, functions = new Set(), displayName = elementClass.name } = options;

  /** extract all properties and combine with exposed functions */
  const elementPropsNames = extractElementProps(elementClass);
  for (const fn of functions.values()) {
    elementPropsNames.add(fn as keyof E);
  }

  /** element native props which should be handled programmatically */
  const nativePropsName = new Set([...elementPropsNames, ...Object.keys(events)]);

  /** create reference component */
  const component = forwardRef((props, __ref?: Ref<E>) => {
    const ref = useForwardRef<E>(__ref);

    /** bind native properties and function */
    useElementProps(ref, props, elementPropsNames);

    /** bind custom events */
    useElementEvents(ref as RefObject<HTMLElement>, props as EventProps, events);

    /** properties which React should handle */
    const reactProps = useMemo(() => {
      const entries = Object.entries(props || {});
      const reactEntries = entries.filter(([k]) => !nativePropsName.has(k));
      const nativeEntries = ref.current
        ? []
        : entries
            /**  filter out native property entries */
            .filter(([k]) => nativePropsName.has(k))
            /** filter supported properties  */
            .filter(([_, v]) => SUPPORTED_REACT_PROP_TYPES.includes(typeof v))
            /** filter out empty properties */
            .filter(([_, v]) => !!v);

      /** combine properties */
      return (
        /** combine properties */
        [...reactEntries, ...nativeEntries]
          /** translate property name to reactName */
          .map(([k, v]) => [translateReactAttribute(k), v] as [string, unknown])
          /** build property object */
          .reduce((c, [k, v]) => Object.assign(c, { [k]: v }), { ref })
      );
    }, [ref, props]);

    return createElement(tag, reactProps);
  });

  /** component display name */
  component.displayName = displayName;

  return component as ForwardRefExoticComponent<
    PropsWithoutRef<ComponentAttributes<E> & P> & RefAttributes<E>
  >;
};

export default createComponent;
