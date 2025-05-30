import { createContext, useContext } from 'react';

import type { FilterOption, FilterOptionContext } from './types';

// @ts-ignore
const context = createContext<FilterOptionContext>({});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const { Provider, Consumer } = context as { Provider: any; Consumer: any };

export const useFilterOptionContext = <
  TOption extends FilterOption = FilterOption,
  TValue = string,
>(): FilterOptionContext<TOption, TValue> =>
  useContext(context) as FilterOptionContext<TOption, TValue>;

export default useFilterOptionContext;
