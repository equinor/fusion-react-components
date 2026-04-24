import { createContext, useContext } from 'react';
import type { FilterContext } from './types';

const context = createContext<FilterContext>({} as FilterContext);

export const useFilterContext = <
  // biome-ignore lint/suspicious/noExplicitAny: TSelection defaults to any to allow untyped usage
  TSelection = any,
  // biome-ignore lint/suspicious/noExplicitAny: TData is a generic record type
  TData extends Record<string, any> = Record<string, any>,
>(): FilterContext<TSelection, TData> => useContext(context) as FilterContext<TSelection, TData>;

// biome-ignore lint/suspicious/noExplicitAny: React context Provider/Consumer types require any for generic usage
export const { Provider, Consumer } = context as { Provider: any; Consumer: any };

export default useFilterContext;
