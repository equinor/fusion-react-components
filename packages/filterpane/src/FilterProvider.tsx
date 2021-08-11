import { PropsWithChildren, useEffect, useMemo } from 'react';
import FilterContext from './FilterContext';
import { createFilterStore } from './filterStore/store';

export type TSelection = unknown;

type FilterProviderProps<TSelections extends Record<string, TSelection>, TData> = {
  initialData: TData;
  initialFilters?: TSelections;
};

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
