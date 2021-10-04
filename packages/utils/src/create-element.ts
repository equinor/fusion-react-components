import { createElement, forwardRef } from 'react';
import { extractElementProps, useElementEvents, useElementProps, useForwardRef } from './hooks';

type ComponentAttributes<T = HTMLHtmlElement> = Omit<React.HTMLAttributes<T>, 'children'>;
type Ctor<T> = { new (): T };

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
  } = {}
): React.ForwardRefExoticComponent<React.PropsWithoutRef<ComponentAttributes<E> & P> & React.RefAttributes<E>> => {
  type ComponentProps = React.PropsWithoutRef<ComponentAttributes<E> & P>;
  type EventProps = Partial<Record<keyof E, React.EventHandler<React.SyntheticEvent<E, Event>>>>;

  const { events = {}, functions = new Set(), displayName = elementClass.name } = options;

  /** extract all properties and combine with exposed functions */
  const elementPropsNames = extractElementProps(elementClass);
  for (const fn of functions.values()) {
    elementPropsNames.add(fn as keyof E);
  }

  /** element native props which should be handled programmatically */
  const nativePropsName = new Set([...elementPropsNames, ...Object.keys(events)]);

  const component = forwardRef((props?: ComponentProps, __ref?: React.Ref<E>) => {
    const ref = useForwardRef<E>(__ref);

    /** bind native properties and function */
    useElementProps(ref, props, elementPropsNames);

    /** bind custom events */
    useElementEvents(ref, props as EventProps, events);

    /** properties which React should handle */
    const reactProps = Object.entries(props || {})
      .filter(([k]) => !nativePropsName.has(k))
      .reduce((c, [k, v]) => Object.assign(c, { [k]: v }), {});

    return createElement(tag, { ...reactProps, ref });
  });

  component.displayName = displayName;

  return component as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ComponentAttributes<E> & P> & React.RefAttributes<E>
  >;
};

export default createComponent;
