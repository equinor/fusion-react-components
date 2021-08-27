import { useCallback, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { withLatestFrom, pluck } from 'rxjs/operators';
import useFilterContext from './useFilterContext';

type FilterChange<TChange> = (data: TChange) => void;
/**
 *Handled updating the filterSelection, when a selection i made.
 * used the  updateFilterSelection to interact with the current selection.
 * Supply the Key for the selection, and a function that describes how the selection should be updated.
 * TChange is the object you send in to the updateSelectionFunction, and can be any information you need.
 *
 * @param key registered filter key
 * @param updateSelectionFunction function that applies the change to the current selection,TChange can be any type of object
 * @returns FilterChange Function
 * @example
 *
 * const selectionUpdate = (change:{name:string,selected:boolean}, selection:string[]) => {
 *    if(change.selected) return  [...selected, change.name]
 *    selection.splice(selection.indexOf(change.name), 1);
 *    return [...selection];
 * }
 *
 * const {onChange} = useFilterChangeHandles('Name',selectionUpdate)
 *
 * <Checkbox onInput={(e) => onChange({name:'Helge',selected:e.currentTarget.checked})}
 *
 */
const useFilterChangeHandler = <TChange, TSelection>(
  key: string,
  updateSelectionFunction: (change: TChange, selection: TSelection) => TSelection
): FilterChange<TChange> => {
  const { store } = useFilterContext();
  const change$: Subject<TChange> = useMemo(() => new Subject<TChange>(), []);
  useEffect(() => {
    const subscription = change$
      .pipe(withLatestFrom(store.selection$.pipe(pluck(key))))
      .subscribe(([change, selection]) => {
        store.updateFilterSelection(key, updateSelectionFunction(change, selection as TSelection));
      });
    return () => subscription.unsubscribe();
  }, [store, key, change$, updateSelectionFunction]);
  return useCallback(
    (data: TChange) => {
      change$.next(data);
    },
    [change$]
  );
};

export default useFilterChangeHandler;
