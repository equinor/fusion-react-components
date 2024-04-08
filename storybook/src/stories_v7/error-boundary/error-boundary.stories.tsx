import { Meta, StoryObj } from '@storybook/react';

import { userEvent, within } from '@storybook/testing-library';

import { ErrorBoundary, ErrorBoundaryProps } from '#packages/errorboundary/src/legacy/ErrorBoundary';
import { useErrorBoundary } from '@equinor/fusion-react-errorboundary';

const meta: Meta<ErrorBoundaryProps> = {
  title: 'data/ErrorBoundary',
  component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<ErrorBoundaryProps>;

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
