import { useContext, useState, useEffect } from 'react';
import FilterContext from '../FilterContext';
import { FilterStore } from '../filterStore/store';

type FilterStoreHook<TData> = {
  filteredData: TData | null;
  selection: Record<string, unknown>;
  store: FilterStore;
};

const useFilterStore = <TData,>(): FilterStoreHook<TData> => {
  const { store } = useContext(FilterContext);
  const [filteredData, setFilteredData] = useState<TData | null>(null);
  const [selection, setSelection] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const sub = store.data$.subscribe((d) => setFilteredData(d as TData));

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = store.selection$.subscribe((d) => setSelection(d));

    return () => sub.unsubscribe();
  }, []);

  return { filteredData, selection, store };
};

export default useFilterStore;
