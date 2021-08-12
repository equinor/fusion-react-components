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
 *Access data using  const { store } = useContext(FilterContext);
 *
 * @param initialData  The full dataset that should be filtered.
 * @param initialFilters Filters to be registered when first loading the provider. Can also send in data that should be filtered on load.
 */
const FilterProvider = <TSelections extends Record<string, unknown>, TData>(
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
