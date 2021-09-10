import { useState, useEffect } from 'react';
import { FilterStore } from '../filterStore/store';
import useFilterContext from './useFilterContext';

type FilterStoreHook<TData> = {
  filteredData: TData | null;
  selection: Record<string, unknown>;
  store: FilterStore;
};

/**
 * A way to access the filteredData and selections.
 * Use full when you need to get hold of the filteredData, to be used in one of your components.
 * Also gives you the entire selections object, with all selections that currently active.
 *
 * The store object is gives you access to the entire FilterProvider "engine".
 *
 * @returns filteredData, selection and store
 *
 * @example
 * ```tsx
 * const {filteredData,selection,store} = useFilterStore();
 *
 * <MyTableComponent data={filteredData} />
 * ```
 */

const useFilterStore = <TData,>(): FilterStoreHook<TData> => {
  const { store } = useFilterContext();
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
