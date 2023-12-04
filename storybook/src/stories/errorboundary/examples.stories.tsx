import { ComponentMeta, ComponentStory } from '@storybook/react';
import { createFallbackRender, ErrorBoundary } from '@equinor/fusion-react-errorboundary/legacy';
import { useErrorBoundary } from '@equinor/fusion-react-errorboundary';

export default {
  title: 'Examples/ErrorBoundary',
  component: ErrorBoundary,
} as ComponentMeta<typeof ErrorBoundary>;

const ErrorComponent = () => {
  const { showBoundary } = useErrorBoundary();
  return <button onClick={() => showBoundary(Error('As expected'))}>trigger errors</button>;
};

const Template: ComponentStory<typeof ErrorBoundary> = (args) => {
  console.log(2222, args);
  return (
    <ErrorBoundary {...args}>
      <ErrorComponent />
    </ErrorBoundary>
  );
};

export const Primary = Template.bind({});

export const Custom = Template.bind({});
Custom.args = {
  fallbackRender: createFallbackRender({
    action: 'custom action',
    title: 'custom error',
    errorType: 'accessDenied',
  }),
};
