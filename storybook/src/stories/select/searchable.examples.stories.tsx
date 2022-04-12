import { Meta, Story } from '@storybook/react';
import { SearchableSelect, SearchableSelectProps } from '@equinor/fusion-react-select/src';

export default {
  title: 'Examples/SearchableSelect',
  component: SearchableSelect,
} as Meta;

const filterData = [
  { text: 'Sed ut perspiciatis', value: '1' },
  { text: 'beatae vitae', value: '2' },
  { text: 'laborious physical', value: '2' },
];

export const Component: Story = (props: Omit<SearchableSelectProps, 'ref'>) => (
  <div style={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
    <div style={{ position: 'relative' }}>
      <SearchableSelect {...props}></SearchableSelect>
    </div>
  </div>
);
Component.args = {
  data: filterData,
};
