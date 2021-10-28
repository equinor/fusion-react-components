import { Meta, Story } from '@storybook/react';
import { Picture, PictureProps } from '@equinor/fusion-react-picture/src';
import { Avatar } from '@equinor/fusion-react-avatar';
import { iconNames } from '@equinor/fusion-react-icon/src';

const pictureSrc = 'https://i.imgur.com/eW6LMB6.jpeg';

export default {
  title: 'Examples/Picture',
  component: Picture,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

type ComponentProps = PictureProps & { initial: string };
export const Component: Story<ComponentProps> = (props: ComponentProps) => (
  <Avatar>
    <Picture slot="picture" {...props} />
  </Avatar>
);
Component.args = {
  src: pictureSrc,
};

export const Simple: Story = () => <Picture src={pictureSrc} />;

export const Alignment: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <Picture src={pictureSrc} position="center" circular />
    <Picture src={pictureSrc} position="top" circular />
    <Picture src={pictureSrc} position="bottom" circular />
    <Picture src={pictureSrc} position="left" circular />
    <Picture src={pictureSrc} position="right" circular />
  </div>
);
