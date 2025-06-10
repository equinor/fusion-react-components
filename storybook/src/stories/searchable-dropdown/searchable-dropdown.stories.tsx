/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react-vite';

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
