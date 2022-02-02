import { Meta, Story } from '@storybook/react';
import { Popover, PopoverProps } from '@equinor/fusion-react-popover/src';
import { useState } from 'react';

export default {
  title: 'Examples/Popover',
  component: Popover,
} as Meta;

const Template: Story<PopoverProps> = (args) => {
  const [visible, setVisibility] = useState<boolean>(false);
  return (
    <Popover {...args} setVisibility={setVisibility} visible={visible}>
      <div>Child Element</div>
    </Popover>
  );
};

export const Component = Template.bind({});
Component.args = {
  strategy: 'fixed',
  baseElement: <span>Base Element</span>,
  title: <div>Title Element</div>,
};

const Template2: Story<PopoverProps> = (args) => {
  const [visible, setVisibility] = useState<boolean>(false);

  return (
    <Popover {...args} setVisibility={setVisibility} visible={visible}>
      <div>
        <button>button1</button>
        <button>button2</button>
      </div>
    </Popover>
  );
};
export const Simple = Template2.bind({});
Simple.args = {
  strategy: 'fixed',
  showCloseIcon: false,
  baseElement: <span>Base Element</span>,
};
