import type { ErrorBoundaryProps } from 'react-error-boundary';

import { Fallback, type FallbackProps } from './Fallback';

export const fallbackRender: ErrorBoundaryProps['fallbackRender'] = (props) => <Fallback error={props.error} />;

export const createFallbackRender =
  (args?: Omit<FallbackProps, 'error'>): ErrorBoundaryProps['fallbackRender'] =>
  /* eslint-disable-next-line react/display-name, react/function-component-definition, react/prop-types*/
  (props) => <Fallback error={props.error} {...args} />;

export default fallbackRender;
