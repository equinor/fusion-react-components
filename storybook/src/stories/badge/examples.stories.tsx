import { Meta, Story } from '@storybook/react';
import { Badge, BadgeProps } from '@equinor/fusion-react-badge/src';
import AvatarElement from '@equinor/fusion-wc-avatar';
import { iconNames } from '@equinor/fusion-react-icon/src';

AvatarElement;

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
  <fwc-avatar>
    <Badge slot="badge" {...props} />
  </fwc-avatar>
);
Component.args = {
  value: 'A',
  color: 'secondary',
  size: 'medium',
  position: 'top-right',
  circular: true,
};

export const Simple: Story = () => (
  <fwc-avatar>
    <Badge slot="badge" value="A" circular />
  </fwc-avatar>
);

export const Icon: Story = () => (
  <fwc-avatar>
    <Badge slot="badge" icon="alarm_on" circular />
  </fwc-avatar>
);

export const Alignment: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <fwc-avatar>
      <Badge slot="badge" position="top-left" circular />
    </fwc-avatar>
    <fwc-avatar>
      <Badge slot="badge" position="top-right" circular />
    </fwc-avatar>
    <fwc-avatar>
      <Badge slot="badge" position="bottom-left" circular />
    </fwc-avatar>
    <fwc-avatar>
      <Badge slot="badge" position="bottom-right" circular />
    </fwc-avatar>
  </div>
);
