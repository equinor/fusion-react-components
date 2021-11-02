import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Provider } from './context';
import FilterStore, { createFilterStore } from '../store/store';

type FilterProviderProps<TSelections extends unknown, TData> = {
  initialData: TData;
  initialFilters?: TSelections;
};

/**
 *Filter Context provider for filtering functionality.
 *Access data using  const { filteredData, selection, store } = useFilterStore();
 *
 * @param initialData  The full dataset that should be filtered.
 * @param initialFilters Filters to be registered when first loading the provider.
 * Can also send in data that should be filtered on load. keys must correspond with keys added to defined filter settings.
 * Or they will not be recognized
 *
 * @example
 *
 *  initialFilter = {firstName: ['Helge'],lastName:[] }  //predefined filters.
 * //firstName will be added to selections with a predefined selection ('Helge'),
 * //while lastName is added to empty([]) to selections.
 *
 * const data = getData();
 *
 *  <FilterProvider initialData={data} initialFilters={initialFilter}>
 *    <MyFilterPanel />
 *    <MyApp> />
 * </FilterProvider>
 */
export const FilterProvider = <TSelections extends Record<string, unknown>, TData>(
  props: PropsWithChildren<FilterProviderProps<TSelections, TData>>
): JSX.Element => {
  const { initialData, initialFilters = {}, children } = props;
  const [store] = useState<FilterStore<TSelections, TData>>(() =>
    createFilterStore<TSelections, TData>(initialData, (initialFilters || {}) as TSelections)
  );

  useLayoutEffect(() => {
    store.setData(initialData);
  }, [store, initialData]);

  // @ts-ignore
  return <Provider value={{ store }}>{children}</Provider>;
};

export default FilterProvider;
