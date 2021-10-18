import { createContext, useContext } from 'react';

import { FilterOption, FilterOptionContext } from './types';

// @ts-ignore
const context = createContext<FilterOptionContext>({});
export const { Provider, Consumer } = context;

export const useFilterOptionContext = <
  TOptions extends Record<string, FilterOption> = Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>> | undefined = undefined
>(): FilterOptionContext<TOptions, TValue> => useContext(context) as FilterOptionContext<TOptions, TValue>;

export default useFilterOptionContext;
