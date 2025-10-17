import {
  type PropsWithChildren,
  type ReactElement,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { BehaviorSubject } from 'rxjs';

import { useObservable, useObservableSubscription } from '@equinor/fusion-observable/react';

import { createSelectionReducer, createDataReducer, createFilterReducer } from './reducers';

import { Provider } from './context';
import { actions } from './actions';
// TODO
import { filterData } from './hooks/useFilterData';
import type { Filter, FilterContext } from './types';

export type FilterProviderProps<TSelections extends Record<string, unknown>, TData> = {
  data: TData[];
  initialSelection?: TSelections;
  initialFilters?: Record<string, Filter<TData, TSelections>>;
};

export const FilterProvider: <
  // biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
  TSelections extends Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
  TData extends Record<string, any> = Record<string, any>,
>(
  props: PropsWithChildren<FilterProviderProps<TSelections, TData>>,
) => ReactElement = <
  // biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
  TSelections extends Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
  TData extends Record<string, any> = Record<string, any>,
>(
  props: PropsWithChildren<FilterProviderProps<TSelections, TData>>,
): ReactElement => {
  const {
    data,
    initialSelection = {} as TSelections,
    initialFilters = {} as Record<string, Filter<TData, unknown>>,
    children,
  } = props;
  const source$ = useObservable(createDataReducer(data), data);
  const selection$ = useObservable(createSelectionReducer(initialSelection), initialSelection);
  const filter$ = useObservable(createFilterReducer({}), initialFilters);

  const filterData$ = useMemo(
    () => filterData(source$, filter$, selection$),
    [source$, filter$, selection$],
  );

  const [data$] = useState(new BehaviorSubject<TData[]>(data));

  useObservableSubscription(filterData$, data$);

  const context = useMemo(
    () =>
      ({
        source$,
        filter$,
        selection$,
        data$,
        /** type issues, might fix later */
      }) as unknown as FilterContext,
    [source$, filter$, selection$, data$],
  );

  useLayoutEffect(() => {
    source$.next(actions.source.update(data));
  }, [source$, data]);

  return <Provider value={context}>{children}</Provider>;
};

export default FilterProvider;
