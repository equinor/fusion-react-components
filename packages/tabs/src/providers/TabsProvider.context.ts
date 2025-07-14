import { createContext, useContext } from 'react';
import type { ITabsProvider } from './TabsProvider';

/**
 * React context for the TabsProvider.
 * Provides access to the ITabsProvider instance for managing tab state.
 */
export const TabContext = createContext<ITabsProvider | null>(null);

/**
 * Custom hook to access the TabsProvider context.
 * Throws an error if used outside of a TabsProvider.
 *
 * @returns {ITabsProvider} The current TabsProvider instance.
 * @throws {Error} If the TabsProvider is not found in the context.
 */
export const useTabsProvider = () => {
  const provider = useContext(TabContext);

  if (!provider) {
    throw new Error('TabsProvider not found');
  }

  return provider;
};
