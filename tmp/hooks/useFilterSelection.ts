import { useState, useLayoutEffect } from 'react';
import { useFilterContext } from '../provider';

/**
 * Gives you the current selection for a given filter key.
 * Updates when the selection changes in the filterstore.
 *
 * @param key Filter key
 * @returns filter selection
 *
 * @example
 * const currentOptionsSelection = useFilterSelection<string[]>('name');
 */
const useFilterSelection = <TSelection extends unknown>(key: string): TSelection | null => {
  const { store } = useFilterContext();
  const [filterSelection, setFilterSelection] = useState<TSelection | null>(null);

  useLayoutEffect(() => {
    const subscription = store.selection$.subscribe((selection) => {
      setFilterSelection((selection[key] as TSelection) || null);
    });
    return () => subscription.unsubscribe();
  }, [store, key]);

  return filterSelection;
};

export default useFilterSelection;
