import { createContext } from 'react';
import FilterStore from './filterStore/store';

export type FilterContext = {
  store: FilterStore<any, any>;
};

const filterContext = createContext<FilterContext>({} as FilterContext);

export default filterContext;
