export type FilterOption = {
  key: string;
  label: string;
  searchString?: string;
};

export type FilterOptions = {
  options: Record<string, FilterOption>;
  sortOrder?: string[];
};

export type FilterOptionsFn<TData> = (data: TData) => FilterOptions;

export default FilterOption;
