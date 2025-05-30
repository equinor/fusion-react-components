import { createContext, useContext } from 'react';
import type { FilterContext } from './types';

const context = createContext<FilterContext>({} as FilterContext);

export const useFilterContext = <
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  TSelection = any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  TData extends Record<string, any> = Record<string, any>,
>(): FilterContext<TSelection, TData> => useContext(context) as FilterContext<TSelection, TData>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const { Provider, Consumer } = context as { Provider: any; Consumer: any };

export default useFilterContext;
