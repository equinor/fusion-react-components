import { Meta, Story } from '@storybook/react';
import { SearchableSelect, SearchableSelectProps } from '@equinor/fusion-react-select/src';

export default {
  title: 'Examples/SearchableSelect',
  component: SearchableSelect,
} as Meta;

export const Component: Story = (props: Omit<SearchableSelectProps, 'ref'>) => (
  <div style={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
    <div style={{ position: 'relative' }}>
      <SearchableSelect {...props}></SearchableSelect>
    </div>
  </div>
);
