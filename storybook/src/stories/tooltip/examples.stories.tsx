import { Meta, Story } from '@storybook/react';
import Tooltip from '@equinor/fusion-react-tooltip/src';
// import { createStyles } from '@/create-styles';

export default {
  title: 'Examples/Tooltip',
  // component: Test,
} as Meta;

// export const Testing: Story = () => <p>ok</p>;
export const Testings: Story = (_args: any) => (
  <>
    <Tooltip content="test">
      <button>testing</button>
    </Tooltip>
    <Tooltip
      render={(_args) => (
        <div>
          <p>ok</p>
          <span>dsadasds</span>
        </div>
      )}
      duration={[100, 1000]}
    >
      <button>testing</button>
    </Tooltip>
  </>
);
