import { useCallback, useEffect, useMemo, useState } from 'react';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { actions } from '../actions';

import { useFilterOptionContext } from '../context';

import { FilterOption } from '../types';

import filterOptionMatchFn from './filter-option-match';
import filterOptionSearchFn from './filter-option-search';
import { FilterOptionMatchFn, FilterOptionSearchFn } from './types';

export const useFilterOptionSearch = <TOption extends FilterOption>(
  searchFn?: FilterOptionSearchFn<Record<string, FilterOption>>,
  matchFn?: FilterOptionMatchFn<TOption>
): {
  setQuery: (query: string) => void;
  query$: Observable<string>;
} => {
  const { options$ } = useFilterOptionContext<Record<string, FilterOption>>();
  const [query$] = useState<Subject<string>>(new Subject());
  const setQuery = useCallback(
    (q: string) => {
      query$.next(q);
    },
    [query$]
  );

  const search = useMemo(() => {
    return searchFn || filterOptionSearchFn(matchFn || filterOptionMatchFn);
  }, [matchFn, searchFn]);

  useEffect(() => {
    const sub = combineLatest([options$, query$])
      .pipe(
        switchMap(([options, query]) => {
          return of(search(options, query));
        }),
        map((x) => actions.set(x))
      )
      .subscribe(options$);
    return () => sub.unsubscribe();
  }, [options$, query$, search]);

  return { setQuery, query$ };
};

export default useFilterOptionSearch;
