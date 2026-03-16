import type { ErrorBoundaryProps } from 'react-error-boundary';

import { Fallback, type FallbackProps } from './Fallback';

export const fallbackRender: ErrorBoundaryProps['fallbackRender'] = (props) => (
  <Fallback error={props.error as Error} />
);

export const createFallbackRender =
  (args?: Omit<FallbackProps, 'error'>): ErrorBoundaryProps['fallbackRender'] =>
  (props) => <Fallback error={props.error as Error} {...args} />;

export default fallbackRender;
