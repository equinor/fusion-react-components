import { Meta, Story } from '@storybook/react';
import Avatar, { AvatarProps } from '@equinor/fusion-react-avatar/src';

export default {
  title: 'Examples/Avatar',
  component: Avatar,
} as Meta;

type ComponentProps = AvatarProps & { initial: string };
export const Component: Story<ComponentProps> = ({ initial, ...props }: ComponentProps) => (
  <Avatar {...props}>{initial}</Avatar>
);
Component.args = {
  initial: 'A',
  color: 'primary',
  size: 'medium',
  clickable: false,
  border: true,
};

export const Simple: Story = () => <Avatar value="A" />;

export const Photo: Story<{ src: string }> = (props) => <Avatar {...props} />;
Photo.args = { src: 'https://i.imgur.com/GcZeeXX.jpeg' };

export const Size: Story<{ sizes: Array<ComponentProps['size']> }> = (props: {
  sizes: Array<ComponentProps['size']>;
}) => (
  <>
    {props.sizes.map((size) => (
      <Avatar key={size} size={size} value="A" />
    ))}
  </>
);
Size.args ??= { sizes: ['large', 'medium', 'small', 'x-small'] };
