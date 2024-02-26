/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';

import {
  SearchableDropdown,
  type SearchableDropdownProps,
} from '@equinor/fusion-react-searchable-dropdown/src/SearchableDropdown';
import { DropdownProvider } from '@equinor/fusion-react-searchable-dropdown/src/DropdownProvider';
import { useDropdownProviderRef } from '@equinor/fusion-react-searchable-dropdown/src/useDropdownProviderRef';

// TODO - simplify
import { _exampleResolver } from './component.helpers';

const meta: Meta<SearchableDropdownProps> = {
  title: 'data/Searchable dropdown',
  component: SearchableDropdown,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const basic: Story = {
  args: {
    label: 'Icons',
    placeholder: 'Search here...',
    variant: 'outlined',
    initialText: 'See results by searching',
    trailingIcon: 'car_wash',
    meta: 'car',
    onSelect: (e) => {
      /* no need to bubble further up the dom */
      e.stopPropagation();
      console.log('Event', e.type, 'fired. Object:', e);
    },
    resolver: _exampleResolver,
  },
  render: (props) => {
    const providerRef = useDropdownProviderRef(_exampleResolver);
    return (
      <DropdownProvider ref={providerRef}>
        <SearchableDropdown {...props} />
      </DropdownProvider>
    );
  },
};
