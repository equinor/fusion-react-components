import { Meta, StoryObj } from '@storybook/react-vite';

import { userEvent, within } from 'storybook/test';

import { ErrorBoundary } from '@equinor/fusion-react-errorboundary/legacy';
import { useErrorBoundary } from '@equinor/fusion-react-errorboundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'data/ErrorBoundary',
  component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

const ErrorComponent = () => {
  const { showBoundary } = useErrorBoundary();
  return (
    <button id="trigger" onClick={() => showBoundary(Error('As expected'))}>
      trigger errors
    </button>
  );
};

export const error_boundary: Story = {
  name: 'ErrorBoundary',
  args: {
    children: <ErrorComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button');
    await userEvent.click(btn, { delay: 2000 });
  },
};
