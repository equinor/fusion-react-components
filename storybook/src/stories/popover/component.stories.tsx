import { Meta, Story } from '@storybook/react';
import { Popover, PopoverProps, ChildrenProps } from '@equinor/fusion-react-popover/src';

const Children = (): JSX.Element => {
  return <div>Child Component</div>;
};

export default {
  title: 'Examples/Popover',
  component: Popover,
  argTypes: {
    children: {
      table: {
        type: {
          summary: 'React.ReactNode',
        },
      },
      control: {
        type: 'select',
        options: {
          default: [<Children key="1" />],
        },
      },
    },
  },
} as Meta;

const Template: Story<PopoverProps> = (args) => <Popover {...args}>{args.children}</Popover>;
export const Component = Template.bind({});
Component.args = {
  placement: 'top',
  strategy: 'fixed',
};
const Content = (props?: ChildrenProps) => (
  <div {...props}>
    <button>button1</button>
    <button>button2</button>
  </div>
);

const Template2: Story<PopoverProps> = (args) => (
  <Popover {...args}>
    <Content />
  </Popover>
);
export const Simple = Template2.bind({});
Simple.args = {
  strategy: 'fixed',
};
