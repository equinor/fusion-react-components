import { useCallback, useLayoutEffect, useState } from 'react';

import { from, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap, reduce, map } from 'rxjs/operators';

import { useObservable } from '@equinor/fusion-react-observable';

import { createSelectionReducer, createDataReducer, createFilterReducer } from './reducers';

import { Provider } from './context';
import { Filter } from './types';
import { actions } from './actions';

export type FilterProviderProps<TSelections extends Record<string, unknown>, TData> = {
  data: TData[];
  initialSelection?: TSelections;
  initialFilters?: Record<string, Filter<TData, TSelections>>;
};

export const FilterProvider = <TSelections extends Record<string, never>, TData>(
  props: React.PropsWithChildren<FilterProviderProps<TSelections, TData>>
): JSX.Element => {
  const {
    data,
    initialSelection = {} as TSelections,
    initialFilters = {} as Record<string, Filter<TData, unknown>>,
    children,
  } = props;
  const source$ = useObservable(createDataReducer(data), data);
  const selection$ = useObservable(createSelectionReducer(initialSelection), initialSelection);
  const filter$ = useObservable(createFilterReducer({}), initialFilters);
  const [data$] = useState(new BehaviorSubject<TData[]>(data));

  const makeFilterData = useCallback(
    (args?: { exclude?: string[] }) => {
      const selectedFilter$ = filter$.pipe(
        map((x) =>
          Object.entries(x)
            .filter(([key]) => !args?.exclude || !args.exclude.includes(key))
            .reduce(
              (acc, [key, value]) => Object.assign(acc, { [key]: value }),
              {} as Record<string, Filter<TData, TSelections>>
            )
        )
      );
      return combineLatest([selection$, source$, selectedFilter$]).pipe(
        switchMap(([selections, data, filters]) => {
          return from(Object.values(filters)).pipe(
            reduce((acc, filter) => {
              const selection = selections[filter.key as keyof TSelections];
              return filter.filterFn(acc, selection);
            }, data)
          );
        })
      );
    },
    [selection$, source$, filter$]
  );

  useLayoutEffect(() => {
    const sub = makeFilterData().subscribe(data$);
    return () => sub.unsubscribe();
  }, [makeFilterData, data$]);

  useLayoutEffect(() => {
    source$.dispatch(actions.source.update(data));
  }, [source$, data]);

  const context = {
    source$,
    filter$,
    selection$,
    data$,
    makeFilterData,
  };

  // @ts-ignore
  return <Provider value={context}>{children}</Provider>;
};

export default FilterProvider;
