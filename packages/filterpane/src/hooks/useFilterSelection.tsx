import { useState, useEffect } from 'react';
import useFilterContext from './useFilterContext';

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
const useFilterSelection = <TSelection,>(key: string): TSelection | null => {
  const { store } = useFilterContext();
  const [filterSelection, setFilterSelection] = useState<TSelection | null>(null);

  useEffect(() => {
    const subscription = store.selection$.subscribe((selection) => {
      setFilterSelection(selection[key] || null);
    });
    return () => subscription.unsubscribe();
  }, [store, key]);

  return filterSelection;
};

export default useFilterSelection;
