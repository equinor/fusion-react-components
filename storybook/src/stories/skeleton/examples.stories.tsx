import { Meta, Story } from '@storybook/react';
import { Skeleton, SkeletonWrapper, SkeletonProps, SkeletonVariant } from '@equinor/fusion-react-skeleton/src';
import { iconNames } from '@equinor/fusion-react-icon/src';

export default {
  title: 'Examples/Skeleton',
  component: Skeleton,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

type ComponentProps = SkeletonProps & { initial: string };
export const Component: Story<ComponentProps> = (props: ComponentProps) => <Skeleton {...props} />;

export const Default: Story = () => <Skeleton></Skeleton>;

export const Square: Story = () => <Skeleton variant={SkeletonVariant.Square}></Skeleton>;

export const Circle: Story = () => <Skeleton variant={SkeletonVariant.Circle}></Skeleton>;

export const Text: Story = () => <Skeleton variant={SkeletonVariant.Text}></Skeleton>;

export const Fluid: Story = () => <Skeleton variant={SkeletonVariant.Text} fluid></Skeleton>;

export const Combination: Story = () => (
  <SkeletonWrapper>
    <Skeleton variant={SkeletonVariant.Square} icon="image" />
    <SkeletonWrapper direction="vertical">
      <Skeleton size="large" variant={SkeletonVariant.Text} />
      <Skeleton size="medium" variant={SkeletonVariant.Text} />
      <Skeleton size="large" variant={SkeletonVariant.Text} />
    </SkeletonWrapper>
  </SkeletonWrapper>
);
