import { type ReactNode, useLayoutEffect, useMemo } from "react";
import { useTabsProvider } from "../providers/TabsProvider.context";
import { type TabObject, mapChildrenToTabs } from "../utils/map-children-to-tabs";

/**
 * Custom hook that processes and memoizes an array of tabs based on the provided children.
 * It extracts the title, component, and children from each Tab element and sets the tabs
 * in the router provider context.
 *
 * @param {ReactNode} children - The children prop containing Tab elements.
 * @returns {TabObject[]} - An array of TabObject containing the processed tabs.
 */
export const useTabs = (children: ReactNode): { left: TabObject[]; right: TabObject[] } => {
  const provider = useTabsProvider();

  /**
   * Memoizes the tabs array based on the children prop.
   * Extracts the title, component, and children from each Tab element.
   * Sets the tabs in the router provider context.
   */
  const { left, right } = useMemo(() => mapChildrenToTabs(children), [children]);
  /**
   * Sets the tabs in the router provider context when the tabs change.
   */
  useLayoutEffect(() => {
    provider.setTabs([left, right].flatMap((group) => group.map((tab) => tab.id)));
  }, [provider, left, right]);

  return { left, right };
};
