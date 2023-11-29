import { Meta, Story } from '@storybook/react';
import ErrorBoundary, { ErrorBoundaryProps } from '@equinor/fusion-react-errorboundary/src';

export default {
  title: 'Examples/ErrorBoundary',
  component: ErrorBoundary,
} as Meta;

export const Component: Story<ErrorBoundaryProps> = (props: ErrorBoundaryProps) => (
  <ErrorBoundary {...props}>
    <p>A child you can trow without any angry parents.</p>
  </ErrorBoundary>
);

Component.args = {};
