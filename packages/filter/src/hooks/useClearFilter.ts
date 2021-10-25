import { useCallback, useMemo } from 'react';

import { withLatestFrom, filter, combineLatest, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { useObservableEffect } from '@equinor/fusion-react-observable';

import { useFilterContext } from '../context';
import { actions } from '../actions';
import { Filter } from '../types';

export const selectionChanges = <TSelection = any>(
  filter$: Observable<Record<string, Filter>>,
  selection$: Observable<Record<string, TSelection>>
): Observable<Record<string, TSelection>> => {
  return combineLatest([selection$, filter$]).pipe(
    map(([selections, filters]) => {
      return Object.values(filters).reduce((acc, filter) => {
        const selection = selections[filter.key];
        const changed = filter.hasChanged && filter.hasChanged(selection, filter.initial);
        return changed ? Object.assign(acc, { [filter.key]: selection }) : acc;
      }, {});
    }),
    distinctUntilChanged()
  );
};

export const useClearFilter = () => {
  const { selection$, filter$ } = useFilterContext();
  const clear = useCallback(() => {
    selection$.next(actions.selection.clear());
  }, [selection$]);

  const initial$ = useMemo(
    () =>
      filter$.pipe(
        map((x) =>
          Object.values(x).reduce((acc, filter) => {
            return Object.assign(acc, { [filter.key]: filter.initial });
          }, {})
        )
      ),
    [filter$]
  );

  const changed$ = useMemo(() => selectionChanges(filter$, selection$), [filter$, selection$]);

  useObservableEffect(
    selection$,
    useCallback(
      (action$) =>
        action$.pipe(
          filter(isActionOf(actions.selection.clear)),
          withLatestFrom(initial$),
          map(([_, initial]) => actions.selection.set(initial))
        ),
      [initial$]
    )
  );

  return { clear, changed$ };
};

export default useClearFilter;
