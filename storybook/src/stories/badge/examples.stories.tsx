import { Meta, Story } from '@storybook/react';
import { Badge, BadgeProps } from '@equinor/fusion-react-badge/src';
import { Avatar } from '@equinor/fusion-react-avatar';
import { iconNames } from '@equinor/fusion-react-icon/src';

export default {
  title: 'Examples/Badge',
  component: Badge,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

type ComponentProps = BadgeProps & { initial: string };
export const Component: Story<ComponentProps> = (props: ComponentProps) => (
  <Avatar>
    <Badge slot="badge" {...props} />
  </Avatar>
);
Component.args = {
  value: 'A',
  color: 'secondary',
  size: 'medium',
  position: 'top-right',
  circular: true,
};

export const Simple: Story = () => (
  <Avatar>
    <Badge slot="badge" value="A" circular />
  </Avatar>
);

export const Icon: Story = () => (
  <Avatar>
    <Badge slot="badge" icon="alarm_on" circular />
  </Avatar>
);

export const Alignment: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <Avatar>
      <Badge slot="badge" position="top-left" circular />
    </Avatar>
    <Avatar>
      <Badge slot="badge" position="top-right" circular />
    </Avatar>
    <Avatar>
      <Badge slot="badge" position="bottom-left" circular />
    </Avatar>
    <Avatar>
      <Badge slot="badge" position="bottom-right" circular />
    </Avatar>
  </div>
);
