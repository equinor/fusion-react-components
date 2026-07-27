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

/**
 * `topLayer` defaults to `true` for context selector results (see the
 * "Rendering above arbitrary Fusion app stacking contexts" section in the package
 * README), so results render in the browser's top layer and can't be clipped or
 * hidden behind app content with its own stacking context. Pass `topLayer={false}`
 * to opt back into the previous shadow-DOM-relative, absolutely positioned behavior.
 */
export const ContextHeaderTopLayerDisabled: Story = {
  ...ContextHeader,
  args: {
    ...ContextHeader.args,
    topLayer: false,
  },
};
