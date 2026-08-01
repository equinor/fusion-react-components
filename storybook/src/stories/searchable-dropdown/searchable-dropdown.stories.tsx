/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from '@equinor/eds-core-react';
import { SearchableDropdown } from '@equinor/fusion-react-searchable-dropdown/src/SearchableDropdown';

// TODO - simplify
import { _exampleResolver } from './component.helpers';

const meta: Meta<typeof SearchableDropdown> = {
  title: 'data/Searchable dropdown',
  component: SearchableDropdown,
};

export default meta;

type Story = StoryObj<typeof SearchableDropdown>;

export const basic: Story = {
  args: {
    placeholder: 'Search here...',
    variant: 'outlined',
    initialText: 'See results by searching',
    onSelect: (e) => {
      /* no need to bubble further up the dom */
      e.stopPropagation();
      console.log('Event', e.type, 'fired. Object:', e);
    },
    resolver: _exampleResolver,
  },
  render: (props) => {
    return <SearchableDropdown {...props} />;
  },
};

export const multiple: Story = {
  args: {
    label: 'Select multiple',
    placeholder: 'Search here...',
    variant: 'outlined',
    multiple: true,
    onSelect: (e) => {
      /* no need to bubble further up the dom */
      e.stopPropagation();
      console.log('Event', e.type, 'fired. Object:', e);
    },
    resolver: _exampleResolver,
  },
  render: (props) => {
    return <SearchableDropdown {...props} />;
  },
};

/**
 * Demonstrates how `topLayer` lets the result list escape an independently
 * created stacking context and render above an overlapping element.
 */
export const TopLayer: Story = {
  ...basic,
  args: {
    ...basic.args,
    topLayer: false,
  },
  render: (args) => (
    <div
      style={{
        position: 'relative',
        transform: 'translateZ(0)',
        padding: '2rem 1rem 260px',
        border: '1px dashed gray',
      }}
    >
      <Typography style={{ margin: '0 0 1rem' }}>
        This box creates its own stacking context via transform: translateZ(0).
        The overlay directly below the input uses z-index: 999, exactly where
        the result list opens. Toggle topLayer in the Controls panel to compare.
      </Typography>
      <div style={{ position: 'relative' }}>
        <SearchableDropdown {...args} />
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '200px',
            zIndex: 999,
            background: 'rgba(226, 6, 44, 0.25)',
            textAlign: 'center',
            paddingTop: '0.5rem',
          }}
        >
          <Typography>
            Overlay with its own stacking context (z-index: 999)
          </Typography>
        </div>
      </div>
    </div>
  ),
};
