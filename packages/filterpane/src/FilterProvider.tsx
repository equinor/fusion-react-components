import { PropsWithChildren, useEffect, useMemo } from 'react';
import FilterContext from './FilterContext';
import { createFilterStore } from './filterStore/store';

export type TSelection = any;

type FilterProviderProps<TSelections extends Record<string, TSelection>, TData> = {
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
  const store = useMemo(() => createFilterStore(initialData, initialFilters || {}), []);

  useEffect(() => {
    store.setData(initialData);
  }, [initialData]);

  return <FilterContext.Provider value={{ store }}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
