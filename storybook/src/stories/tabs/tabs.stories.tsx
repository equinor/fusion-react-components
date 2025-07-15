import type { Meta, StoryObj } from '@storybook/react-vite';
import { faker } from '@faker-js/faker';

import { TabProvider, useActiveTab } from '@equinor/fusion-react-tabs';
import { Button } from '@equinor/eds-core-react';

const meta: Meta<typeof TabProvider> = {
  title: 'ui/Tabs',
  component: TabProvider,
  argTypes: {
    id: {
      description: 'Unique identifier for the Tabs component',
    },
    activeTab: {
      description: 'Initial active tab ID',
    },
    height: {
      description:
        'Height of the tab panels, can be a string (e.g., "10vh") or a number (in pixels)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'auto' },
      },
    },
    displayLine: {
      description: 'Whether to display a line under tabs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabProvider>;

faker.seed(1);

// Uncontrolled Tabs (default)
export const basicUncontrolled: Story = {
  args: {
    id: 'basic-tabs',
    activeTab: '1',
  },
  render: (props) => (
    <TabProvider {...props}>
      {[...Array(3)].map((_, index) => (
        <TabProvider.Tab key={index} title={`Tab ${index}`} id={String(index)}>
          <p>{faker.lorem.paragraphs()}</p>
        </TabProvider.Tab>
      ))}
    </TabProvider>
  ),
};

// Controlled Tabs
export const controlledTabs: Story = {
  args: {
    id: 'controlled-tabs',
  },
  render: (props) => {
    const Tab0 = () => {
      const { setActiveTab } = useActiveTab();
      return (
        <div>
          <p>{faker.lorem.paragraphs()}</p>
          <Button
            onClick={() => {
              setActiveTab('tab1');
            }}
          >
            <span>Go to Tab 1</span>
          </Button>
        </div>
      );
    };

    const Tab1 = () => {
      const { setActiveTab } = useActiveTab();
      return (
        <div>
          <p>{faker.lorem.paragraphs()}</p>
          <Button
            onClick={() => {
              setActiveTab('tab0');
            }}
          >
            <span>Go back to Tab 0</span>
          </Button>
        </div>
      );
    };

    return (
      <TabProvider {...props}>
        <TabProvider.Tab title="Tab 0" id="tab0">
          <Tab0 />
        </TabProvider.Tab>
        <TabProvider.Tab title="Tab 1" id="tab1">
          <Tab1 />
        </TabProvider.Tab>
      </TabProvider>
    );
  },
};

// Tabs with Scrollable Height and No Line
export const scrollableHeight: Story = {
  args: {
    id: 'scrollable-tabs',
    height: '10vh',
    displayLine: false,
  },
  render: (props) => (
    <TabProvider {...props}>
      {[...Array(5)].map((_, index) => (
        <TabProvider.Tab key={index} title={`Tab ${index}`} id={String(index)}>
          <p>{faker.lorem.paragraphs(6)}</p>
        </TabProvider.Tab>
      ))}
    </TabProvider>
  ),
};

// Right-Aligned Tabs
export const rightAlignedTabs: Story = {
  args: {
    id: 'right-aligned-tabs',
  },
  render: (props) => (
    <TabProvider {...props}>
      <TabProvider.Tab id="tab1" title="Left Tab">
        <p>Left-aligned tab content</p>
      </TabProvider.Tab>
      <TabProvider.Tab id="tab2" title="Right Tab" right>
        <p>This tab is floated to the right.</p>
      </TabProvider.Tab>
      <TabProvider.Tab id="tab3" title="Settings" right>
        <p>Another right-aligned tab</p>
      </TabProvider.Tab>
    </TabProvider>
  ),
};
