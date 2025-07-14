import { useLayoutEffect, useMemo } from 'react';
import { TabsProvider } from '../providers/TabsProvider';

/**
 * Custom React hook for initializing and managing a TabsProvider instance.
 *
 * This hook creates a new TabsProvider for a given tab group ID and location.
 * It also synchronizes the active tab with the provider whenever the `activeTab` value changes.
 *
 * Intended for managing tab state and routing.
 * Returns the initialized TabsProvider instance for further interaction.
 *
 * @param {string} id - Unique identifier for the tab group.
 * @param {string | undefined} activeTab - The currently active tab ID.
 * @param {Location} location - The location object.
 * @returns {TabsProvider} The initialized TabsProvider instance.
 *
 * @example
 * const provider = useInitializeTabsProvider('my-tabs', 'tab1', window.location);
 * provider.setTabs(['tab1', 'tab2']);
 * provider.setActiveTab('tab2');
 */
export const useInitializeTabsProvider = (
  id: string,
  activeTab: string | undefined,
  location: Location,
) => {
  //Creates a new TabsProvider instance with the given id.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only 'id' is used to create a new TabsProvider instance. 'location' does not need to trigger recreation.
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
