/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton/src/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'ui/Skeleton',
  component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const basic: Story = {
  args: {
    size: SkeletonSize.Medium,
    children: <span>skeleton</span>,
  },
};

export const sizes: Story = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexFlow: 'column', gap: 10 }}>
      {Object.values(SkeletonSize).map((size) => (
        <div key={size}>
          <Skeleton {...props} size={size}>
            <span>{size}</span>
          </Skeleton>
        </div>
      ))}
    </div>
  ),
};

export const variant: Story = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexFlow: 'column', gap: 10 }}>
      {Object.values(SkeletonVariant).map((variant) => (
        <div key={variant} style={{ display: 'block' }}>
          <span>{variant}</span>
          <Skeleton {...props} key={variant} variant={variant}></Skeleton>
        </div>
      ))}
    </div>
  ),
};

export const customColor: Story = {
  args: {
    ...basic.args,
    style: {
      // @ts-expect-error
      '--fwc-skeleton-fill-color': 'rgba(0, 111, 0, 0.25)',
      '--fwc-skeleton-ink-color': 'rgba(111, 0, 0, 0.75)',
    },
  },
};
