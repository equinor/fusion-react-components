import { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextProvider,
  ContextSelector,
  ContextSearch,
  ContextSelectEvent,
} from '@equinor/fusion-react-context-selector/src';
import { _exampleResolver } from './context-selector.helpers';

const meta: Meta<typeof ContextSearch> = {
  title: 'data/ContextSelector',
  component: ContextSelector,
};

export default meta;

type Story = StoryObj<typeof ContextSearch>;

export const ContextHeader: Story = {
  args: {
    placeholder: 'Start to type to search...',
    initialText: 'The initial text result',
    variant: 'header',
    dropdownHeight: '300px',
    onSelect: (e: ContextSelectEvent) => {
      e.stopPropagation();
      console.log('Event', e.type, 'fired. Object:', e);
    },
    onClearContext: () => {
      console.log('Context Clearing');
    },
  },
  render: (args) => (
    <ContextProvider resolver={_exampleResolver}>
      <ContextSearch {...args} />
    </ContextProvider>
  ),
};
