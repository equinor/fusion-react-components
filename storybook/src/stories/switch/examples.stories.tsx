import { Meta, Story } from '@storybook/react';
import { Switch, SwitchProps, HTMLSwitchCustomElement } from '@equinor/fusion-react-switch/src';
import React, { useCallback, useState } from 'react';
import { Button } from '@storybook/components';

export default {
  title: 'Examples/Switch',
  component: Switch,
} as Meta;

type Props = Omit<SwitchProps, 'ref'>;

export const Component: Story = (props: Props) => <Switch {...props} />;

Component.args = {
  label: 'My Switch',
};

export const OnInput: Story<Props> = (props) => {
  const [selected, setSelected] = useState(true);
  // TODO - fix when change event is fired!
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLSwitchCustomElement>) => {
      setSelected(e.currentTarget.selected);
    },
    [setSelected]
  );
  return (
    <div>
      <Switch {...props} selected={selected} onClick={onClick} />
      <Button onClick={() => setSelected(!selected)}>Toggle to {selected ? 'not selected' : 'selected'}</Button>
    </div>
  );
};
