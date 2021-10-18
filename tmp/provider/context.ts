import { createContext, useContext } from 'react';
import FilterStore from '../store/store';

export type FilterContext<TSelections extends Record<string, unknown> = Record<string, unknown>, TData = unknown> = {
  store: FilterStore<TSelections, TData>;
};

const context = createContext<FilterContext>({} as FilterContext);

export const useFilterContext = <
  TSelections extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown
>(): FilterContext<TSelections, TData> => useContext(context) as FilterContext<TSelections, TData>;

export const { Provider } = context;

export default context;
