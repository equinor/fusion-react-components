import { createContext, useContext } from 'react';
import { FilterContext } from './types';

const context = createContext<FilterContext>({} as FilterContext);
export const useFilterContext = <TSelections extends Record<string, unknown>, TData>(): FilterContext<
  TSelections,
  TData
> => useContext(context) as FilterContext<TSelections, TData>;

export const { Provider, Consumer } = context;

export default useFilterContext;
