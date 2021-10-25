import { createContext, useContext } from 'react';

import type { FilterOption, FilterOptionContext } from './types';

// @ts-ignore
const context = createContext<FilterOptionContext>({});
export const { Provider, Consumer } = context;

export const useFilterOptionContext = <
  TOption extends FilterOption = FilterOption,
  TValue = string
>(): FilterOptionContext<TOption, TValue> => useContext(context) as FilterOptionContext<TOption, TValue>;

export default useFilterOptionContext;
