import { Meta, Story } from '@storybook/react';
import { Popover, PopoverProps } from '@equinor/fusion-react-popover/src';

export default {
  title: 'Examples/Popover',
  component: Popover,
  argTypes: {
    children: {
      table: {
        type: {
          summary: '(props: PopperChildrenProps) => React.ReactNode',
        },
      },
    },
  },
} as Meta;

const Template: Story<PopoverProps> = (args) => (
  <Popover {...args}>
    <div>Child Element</div>
  </Popover>
);

export const Component = Template.bind({});
Component.args = {
  placement: 'auto',
  strategy: 'fixed',
  baseElement: <span>Base Element</span>,
  title: <div>Title Element</div>,
};

const Template2: Story<PopoverProps> = (args) => (
  <Popover {...args}>
    <div>
      <button>button1</button>
      <button>button2</button>
    </div>
  </Popover>
);
export const Simple = Template2.bind({});
Simple.args = {
  strategy: 'fixed',
  baseElement: <span>Base Element</span>,
};
