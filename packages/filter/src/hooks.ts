import { useCallback, useLayoutEffect } from 'react';

import { useSelector, Observable } from '@equinor/fusion-react-observable';

import { actions } from './actions';
import { useFilterContext } from './context';
import { Filter } from './types';

/** re-exports */
export { useFilterContext };

export const useFilter = <TData, TSelection>(filter: Filter<TData, TSelection>): ((value: TSelection) => void) => {
  const context = useFilterContext();
  const { key } = filter;
  useLayoutEffect(() => {
    context.filter$.dispatch(actions.filter.add(filter));
    () => context.filter$.dispatch(actions.filter.remove(filter.key));
  }, [context, filter]);

  return useCallback(
    (selection: TSelection) => {
      context.selection$.dispatch(actions.selection.set({ [key]: selection }));
    },
    [context, key]
  );
};

/**
 * Use the filter selection from filter provider context
 * @param filterKey {string} the key that the filter was registered on
 * @returns {Observable<TSelection>}
 */
export const useFilterSelection = <TSelection>(filterKey: string): Observable<TSelection> =>
  useSelector(useFilterContext().selection$, filterKey);
