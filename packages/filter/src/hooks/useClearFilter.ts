import { useCallback, useMemo } from 'react';

import { combineLatest } from 'rxjs';
import type { Observable } from 'rxjs';
import { map, distinctUntilChanged, filter, withLatestFrom } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { useObservableFlow } from '@equinor/fusion-observable/react';

import { useFilterContext } from '../context';
import { actions } from '../actions';

import type { Filter } from '../types';

export const selectionChanges = <TSelection = any>(
  filter$: Observable<Record<string, Filter>>,
  selection$: Observable<Record<string, TSelection>>,
): Observable<Record<string, TSelection>> => {
  return combineLatest([selection$, filter$]).pipe(
    map(([selections, filters]) => {
      return Object.values(filters).reduce((acc, filter) => {
        const selection = selections[filter.key];
        const changed = filter.hasChanged && filter.hasChanged(selection, filter.initial);
        return changed ? Object.assign(acc, { [filter.key]: selection }) : acc;
      }, {});
    }),
    distinctUntilChanged(),
  );
};

export const useClearFilter = (): { clear: VoidFunction; changed$: Observable<Record<string, any>> } => {
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
          }, {}),
        ),
      ),
    [filter$],
  );

  const changed$ = useMemo(() => selectionChanges(filter$, selection$), [filter$, selection$]);

  useObservableFlow(
    selection$,
    useCallback(
      (action$) =>
        action$.pipe(
          filter(isActionOf(actions.selection.clear)),
          withLatestFrom(initial$),
          map(([_, initial]) => actions.selection.set(initial)),
        ),
      [initial$],
    ),
  );

  return { clear, changed$ };
};

export default useClearFilter;
