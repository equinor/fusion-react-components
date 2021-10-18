import { Meta, Story } from '@storybook/react';
import { Chip, ChipProps } from '@equinor/fusion-react-chip/src';
import { iconNames } from '@equinor/fusion-react-icon/src';

export default {
  title: 'Examples/Chip',
  component: Chip,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

type ComponentProps = ChipProps & { initial: string };
export const Component: Story<ComponentProps> = (props: ComponentProps) => <Chip {...props} />;
Component.args = {
  size: 'medium',
  variant: 'filled',
  color: 'primary',
  value: 'Failure is success in progress',
};

export const Simple: Story = () => (
  <Chip variant="filled" icon="settings">
    Hello World
  </Chip>
);
