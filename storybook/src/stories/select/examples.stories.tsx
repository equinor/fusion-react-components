import { useState, useCallback } from 'react';
import { Meta, Story } from '@storybook/react';
import { Select, SelectProps } from '@equinor/fusion-react-select/src';
import { ListItem } from '@equinor/fusion-react-list';

export default {
  title: 'Examples/Select',
  component: Select,
} as Meta;

export const Component: Story<SelectProps> = ({ ...props }) => {
  const [selected, setSelected] = useState(0);
  const selectEvent = useCallback(
    (d) => {
      setSelected(d.nativeEvent.detail.index);
    },
    [setSelected]
  );
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '300px' }}>
      <div style={{ position: 'relative' }}>
        <Select {...props} onSelected={selectEvent}>
          <ListItem>Select item</ListItem>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </Select>
        <p>Selected index = {selected}</p>
      </div>
    </div>
  );
};

Component.args = {
  // value: 'item-2', // Setting fixed value should be combined with state
  // helper: 'Heelp, not just anybody',
  // outlined: true,
  // value: 'value',
  // name: 'name',
  // label: 'label',
  // disabled: true,
  // required: true,
};
