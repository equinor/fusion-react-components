import { createContext, useContext } from 'react';
import type { ITabsProvider } from './TabsProvider';

export const TabContext = createContext<ITabsProvider | null>(null);

export const useTabsProvider = () => {
  const provider = useContext(TabContext);

  if (!provider) {
    throw new Error('TabsProvider not found');
  }

  return provider;
};
