type FilterStoreState<TSelections extends Record<string, unknown> = Record<string, unknown>, TData = unknown> = {
  data: TData;
  selection: TSelections;
};

export default FilterStoreState;
