type FilterStoreState<TSelection extends Record<string, unknown> = Record<string, unknown>, TData = unknown> = {
  data: TData;
  selection: TSelection;
};

export default FilterStoreState;
