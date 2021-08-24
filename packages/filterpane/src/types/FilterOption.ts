import { ReactNode } from 'react';

type FilterOption = {
  key: string;
  label: ReactNode;
  searchString?: string;
};

export type FilterOptions = {
  options: Record<string, FilterOption>;
  sortOrder?: string[];
};

export type FilterOptionsFn<TData> = (data: TData) => FilterOptions;

export default FilterOption;
