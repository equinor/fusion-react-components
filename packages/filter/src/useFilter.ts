import { useCallback, useLayoutEffect } from 'react';

import { actions } from './actions';
import { useFilterContext } from './context';
import { Filter } from './types';

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

export default useFilter;
