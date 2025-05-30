import { useMemo } from 'react';

import { combineLatest, from } from 'rxjs';
import type { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, reduce } from 'rxjs/operators';
import { useFilterContext } from '.';

import type { Filter } from '../types';

type useFilterDataArgs = {
  /** array of filter keys of filters that will not be included in the data filtration */
  exclude?: string[];
};

export const filterSelection = (
  filter$: Observable<Record<string, Filter>>,
  exclude?: string[],
): Observable<Record<string, Filter>> => {
  return filter$.pipe(
    /** create a selection of filters base on provided args  */
    map((x) =>
      Object.entries(x)
        .filter(([key]) => !exclude || !exclude.includes(key))
        .reduce((acc, [key, filter]) => Object.assign(acc, { [key]: filter }), {}),
    ),
    /** only update filters when filter function changes */
    distinctUntilChanged((a, b) => {
      const filterA = Object.values(a);
      const filterB = Object.values(b);
      if (filterA.length !== filterB.length) return false;
      return !filterA.find((x) => filterB.find((y) => x.filterFn !== y.filterFn));
    }),
  );
};

export const filterData = <TInn extends Record<string, any>, TOut extends Record<string, any> = TInn>(
  source$: Observable<TInn[]>,
  filter$: Observable<Record<string, Filter<TInn>>>,
  selection$: Observable<Record<string, any>>,
): Observable<TOut[]> => {
  return combineLatest([selection$, source$, filter$]).pipe(
    switchMap(([selections, source, filters]) => {
      /** loop threw all provided filters */
      return from(Object.values(filters)).pipe(
        reduce((acc, filter) => {
          /** extract selection for current filter */
          const selection = selections[filter.key];
          return selection ? filter.filterFn(acc, selection) : acc;
        }, source),
      ) as unknown as Observable<TOut[]>;
    }),
  );
};

export const useFilterData = <TData extends Record<string, any>>(args?: useFilterDataArgs): Observable<TData[]> => {
  const { exclude } = args || {};
  const { source$, filter$, selection$ } = useFilterContext();

  /** create selection of filters to apply */
  const selectedFilter$ = useMemo(() => filterSelection(filter$, exclude), [filter$, exclude]);

  /** create observable filtered data */
  return useMemo(() => filterData(source$, selectedFilter$, selection$), [source$, selectedFilter$, selection$]);
};

export default useFilterData;
