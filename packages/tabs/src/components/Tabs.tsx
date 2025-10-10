import type { PropsWithChildren, ReactElement } from 'react';
import { Tabs as EdsTabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useCallback } from 'react';
import { styled } from 'styled-components';
import { useActiveTab } from '../hooks/use-active-tab';
import { useTabs } from '../hooks/use-tabs';

export type Variants = 'fullWidth' | 'minWidth' | '';

// This is to allow for the use of margin-left: auto on the right tabs
const EdsList = styled(EdsTabs.List)`
  display: flex;
`;

// This is to allow for the use of height on the panels and will default to auto if no height is provided
// and will provide a scroll bar if the content is too large
const EdsPanels = styled(EdsTabs.Panels)<{ height?: string | number }>` 
  ${({ height }) => (height ? 'overflow-x: hidden' : '')};
  ${({ height }) => (height ? 'overflow-y: auto' : '')};
  height: ${({ height }) => (height ? (typeof height === 'string' ? height : `${height}px`) : 'auto')};
`;

const Line = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  margin-top: -2px;
  background-color: ${tokens.colors.ui.background__medium.rgba};
`;

export type TabsProps = {
  displayLine?: boolean;
  height?: string | number;
  variant?: Variants;
  scrollable?: boolean;
};

/**
 * Tabs component that renders a set of tabs and their corresponding panels.
 *
 * @param {PropsWithChildren} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child elements, expected to be `Tab` components.
 *
 * @returns {ReactElement} The rendered Tabs component.
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <Tab title="Tab 1">
 *     <div>Content for Tab 1</div>
 *   </Tab>
 *   <Tab title="Tab 2" component={<CustomComponent />} />
 * </Tabs>
 * ```
 */
export const Tabs = ({
  children,
  displayLine,
  height,
  variant,
  scrollable,
}: PropsWithChildren<TabsProps>): ReactElement => {
  const { activeTab, setActiveTabIndex } = useActiveTab();

  // Extracts the title, component, and children from each Tab element.
  const { left, right } = useTabs(children);

  /**
   * Handles the tab change event.
   * Sets the active tab index in the router provider context.
   *
   * @param {number} tab - The index of the selected tab.
   */
  const handleOnChange = useCallback(
    (tab: string | number) => {
      setActiveTabIndex(Number(tab));
    },
    [setActiveTabIndex],
  );

  return (
    <EdsTabs
      scrollable={scrollable}
      variant={variant}
      activeTab={activeTab}
      onChange={handleOnChange}
    >
      <EdsList>
        {left.map((tab) => (
          <EdsTabs.Tab key={`${tab.id}-tab`}>{tab.title}</EdsTabs.Tab>
        ))}
        {right.map((tab, idx) => (
          <EdsTabs.Tab style={idx === 0 ? { marginLeft: 'auto' } : {}} key={`${tab.id}-tab`}>
            {tab.title}
          </EdsTabs.Tab>
        ))}
      </EdsList>
      {displayLine && <Line />}
      <EdsPanels height={height}>
        {left.map((tab) => (
          <EdsTabs.Panel key={`${tab.id}-panel`}>
            {tab.component ? tab.component : tab.children}
          </EdsTabs.Panel>
        ))}
        {right.map((tab) => (
          <EdsTabs.Panel key={`${tab.id}-panel`}>
            {tab.component ? tab.component : tab.children}
          </EdsTabs.Panel>
        ))}
      </EdsPanels>
    </EdsTabs>
  );
};
