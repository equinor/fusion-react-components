import { type PropsWithChildren, type ReactElement, useMemo } from 'react';

import { TabContext } from '../providers/TabsProvider.context';

import { useInitializeTabsProvider } from '../hooks/use-initialize-tabs-provider';
import { validateChildrenAsTabs } from '../utils/validate-children-as-tabs';
import { Tab } from './Tab';
import { Tabs } from './Tabs';

/**
 * Props for the TabRouter component.
 *
 * @property {string} id - The unique identifier for the TabRouter.
 * @property {string} [activeTab] - The currently active page in the TabRouter. Optional.
 */
type TabRouterProps = {
  id: string;
  activeTab?: string;
  height?: string | number;
  displayLine?: boolean;
};

/**
 * TabProvider component is responsible for managing and providing the context for tab navigation.
 * It ensures that only `Tab` components are accepted as children and initializes the tab provider.
 *
 * @param {PropsWithChildren<TabRouterProps>} props - The properties for the TabRouter component.
 * @param {ReactNode} props.children - The child components, which should be of type `Tab`.
 * @param {string} props.id - The unique identifier for the tab router.
 * @param {string} props.activeTab - The identifier for the currently active tab.
 *
 * @throws {Error} If any child component is not of type `Tab`.
 *
 * @returns {ReactElement} The rendered TabRouter component with the provided context.
 */
export const TabProvider = ({
  children,
  id,
  activeTab,
  displayLine = true,
  height,
}: PropsWithChildren<TabRouterProps>): ReactElement => {
  const provider = useInitializeTabsProvider(id, activeTab, window.location);

  /**
   * Validates that all children are of type `Tab`.
   *
   * @returns {boolean} True if all children are `Tab` components, otherwise false.
   */
  const isValid = useMemo(() => validateChildrenAsTabs(children), [children]);

  if (!isValid) {
    throw new Error('TabRouter only accepts Tab as children');
  }

  return (
    <TabContext.Provider value={provider}>
      <Tabs displayLine={displayLine} height={height}>
        {children}
      </Tabs>
    </TabContext.Provider>
  );
};

TabProvider.Tab = Tab;
