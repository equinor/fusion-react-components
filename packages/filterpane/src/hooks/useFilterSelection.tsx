import { useContext, useState, useEffect } from 'react';
import FilterContext from '../FilterContext';

const useFilterSelection = <TSelection,>(key: string): TSelection | null => {
  const { store } = useContext(FilterContext);
  const [filterSelection, setFilterSelection] = useState<TSelection | null>(null);

  useEffect(() => {
    const subscription = store.selection$.subscribe((selection) => {
      setFilterSelection(selection[key] || null);
    });
    return () => subscription.unsubscribe();
  }, [key]);

  return filterSelection;
};

export default useFilterSelection;
