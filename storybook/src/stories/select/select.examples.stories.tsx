import { Meta, Story } from '@storybook/react';
import { Select, SelectProps } from '@equinor/fusion-react-select/src';
import { ListItem } from '@equinor/fusion-react-list/src';

export default {
  title: 'Examples/Select',
  component: Select,
} as Meta;

export const Component: Story = (props: Omit<SelectProps, 'ref'>) => (
  <div style={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
    <div style={{ position: 'relative' }}>
      <Select {...props}>
        <ListItem>List 1</ListItem>
        <ListItem>List 2</ListItem>
        <ListItem>List 3</ListItem>
      </Select>
    </div>
  </div>
);
