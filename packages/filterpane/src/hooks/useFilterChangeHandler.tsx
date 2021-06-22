import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { withLatestFrom, pluck } from 'rxjs/operators';
import FilterContext from '../FilterContext';

type FilterChange<TChange> = (data: TChange) => void;

const useFilterChangeHandler = <TChange, TSelection>(
  key: string,
  fn: (change: TChange, selection: TSelection) => TSelection
): FilterChange<TChange> => {
  const { store } = useContext(FilterContext);
  const change$: Subject<TChange> = useMemo(() => new Subject<TChange>(), []);
  useEffect(() => {
    const subscription = change$
      .pipe(withLatestFrom(store.selection$.pipe(pluck(key))))
      .subscribe(([change, selection]) => {
        store.updateFilterSelection(key, fn(change, selection as TSelection));
      });
    return () => subscription.unsubscribe();
  }, [store, key]);
  return useCallback(
    (data: TChange) => {
      change$.next(data);
    },
    [change$]
  );
};

export default useFilterChangeHandler;
