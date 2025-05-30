import { useCallback, useLayoutEffect } from 'react';

import { actions } from '../actions';
import { useFilterContext } from '../context';

import type { Filter } from '../types';

/**
 * Hook for attaching a filter to the current context
 * Must be used within {@link FilterProvider}
 */
export const useFilter = <TData, TSelection>(filter: Filter<TData, TSelection>): ((value: TSelection) => void) => {
  const context = useFilterContext();
  const { key } = filter;
  useLayoutEffect(() => {
    /** add filter to store */
    context.filter$.next(actions.filter.add(filter));

    /** add initial selection to filter selection */
    if (!Object.keys(context.selection$.value).includes(key)) {
      context.selection$.next(actions.selection.initial({ [key]: filter.initial }));
    }
    /** remove filter when consumer unmounts */
    return () => context.filter$.next(actions.filter.remove(filter.key));
  }, [context, filter, key]);

  /** return a function which the consumer can set the selection for the provided filter  */
  return useCallback(
    (selection: TSelection) => {
      context.selection$.next(actions.selection.set({ [key]: selection }));
    },
    [context, key],
  );
};
