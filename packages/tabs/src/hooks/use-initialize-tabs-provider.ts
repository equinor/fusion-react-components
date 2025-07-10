import { useLayoutEffect, useMemo } from 'react';
import { TabsProvider } from '../providers/TabsProvider';

export const useInitializeTabsProvider = (
  id: string,
  activeTab: string | undefined,
  location: Location,
) => {
  //Creates a new TabsProvider instance with the given id.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const provider = useMemo(
    () =>
      new TabsProvider(
        {
          id,
        },
        location,
      ),
    [id],
  );

  /**
   * Initializes the TabsProvider when the component mounts and clears it when the component unmounts.
   */
  useLayoutEffect(() => {
    provider.initialize(window.location.href);
    return () => {
      provider.clear();
    };
  }, [provider]);

  /**
   * Sets the active page when the component mounts and makes the provider controllable.
   */
  useLayoutEffect(() => {
    provider.setActiveTab(activeTab);
  }, [activeTab, provider]);

  return provider;
};
