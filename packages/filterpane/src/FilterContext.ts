import { createContext, useContext } from 'react';
import FilterStore from './filterStore/store';

type AppContext = {
  store: FilterStore<any, any>;
};

const context = createContext<AppContext>({} as AppContext);

export const useAppContext = (): AppContext => useContext(context);

export default context;
