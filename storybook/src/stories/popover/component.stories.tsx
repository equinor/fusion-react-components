import { Meta, Story } from '@storybook/react';
import { Popover, PopoverProps } from '@equinor/fusion-react-popover/src';

export default {
  title: 'Examples/Popover',
  component: Popover,
} as Meta;

const Template: Story<PopoverProps> = (args) => <Popover {...args} />;

export const Component = Template.bind({});

Component.args = {
  test: true,
};

export const Title = Template.bind({});

Title.args = {
  test: false,
};
