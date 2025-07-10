import { useObservableState } from '@equinor/fusion-observable/react';
import { useCallback, useMemo } from 'react';
import { useTabsProvider } from '../providers/TabsProvider.context';

type UseActiveTab = {
  activeTab: number | undefined;
  setActiveTabIndex: (tabIndex: number) => void;
  setActiveTab: (tabId: string) => void;
};

/**
 * Custom hook that provides the active tab state and functions to set the active tab.
 *
 * @returns {UseActiveTab} An object containing the current active tab, a function to set the active tab by ID,
 * and a function to set the active tab by index.
 *
 * @example
 * const { activeTab, setActiveTab, setActiveTabIndex } = useActiveTab();
 *
 * // Set active tab by ID
 * setActiveTab('tab1');
 *
 * // Set active tab by index
 * setActiveTabIndex(0);
 */
export const useActiveTab = (): UseActiveTab => {
  const provider = useTabsProvider();

  const { value: activeTab } = useObservableState(
    useMemo(() => provider.activeTabIndex$, [provider]),
  );

  const setActiveTab = useCallback(
    (tabId: string) => {
      provider.setActiveTab(tabId);
    },
    [provider],
  );

  const setActiveTabIndex = useCallback(
    (tabIndex: number) => {
      provider.setActiveTabIndex(tabIndex);
    },
    [provider],
  );

  return { activeTab, setActiveTabIndex, setActiveTab };
};
