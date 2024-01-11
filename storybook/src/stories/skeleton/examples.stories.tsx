import { Meta, Story } from '@storybook/react';
import { Skeleton, SkeletonProps, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton/src';

export default {
  title: 'Examples/Skeleton',
  component: Skeleton,
} as Meta;

export const Component: Story<SkeletonProps> = (props: SkeletonProps) => (
  <Skeleton size={SkeletonSize.Medium} {...props} />
);

export const Default: Story = () => <Skeleton></Skeleton>;
export const WithText: Story = () => <Skeleton>Fusion</Skeleton>;
export const WithCustomColor: Story = () => (
  <Skeleton
    style={{ '--fwc-skeleton-fill-color': 'rgba(0, 111, 0, 0.25)', '--fwc-skeleton-ink-color': '#000' }}
    variant={SkeletonVariant.Text}
  >
    Custom Color
  </Skeleton>
);
export const Sizes: Story = () =>
  Object.values(SkeletonSize).map((size) => (
    <>
      <Component key={size} size={size}></Component>
      <br />
    </>
  ));

export const Variants: Story = () =>
  Object.values(SkeletonVariant).map((variant) => (
    <div key={variant} style={{ display: 'flex' }}>
      <div>
        <p>{variant}</p>
        <Component variant={variant}></Component>
      </div>
    </div>
  ));
