import { createContext, useContext } from 'react';
import type { FilterContext } from './types';

const context = createContext<FilterContext>({} as FilterContext);

export const useFilterContext = <
  TSelection = any,
  TData extends Record<string, any> = Record<string, any>,
>(): FilterContext<TSelection, TData> => useContext(context) as FilterContext<TSelection, TData>;

export const { Provider, Consumer } = context as { Provider: any; Consumer: any };

export default useFilterContext;
