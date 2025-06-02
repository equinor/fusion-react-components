import {
  ErrorBoundary as ReactErrorBoundary,
  type ErrorBoundaryProps as ReactReactErrorBoundary,
} from 'react-error-boundary';
import { fallbackRender } from './fallbackRender';

export type ErrorBoundaryProps = Partial<ReactReactErrorBoundary>;

const reload = () => window.location.reload();

export const ErrorBoundary = (props: ErrorBoundaryProps): JSX.Element => {
  const args = { ...props };
  if (!args.fallbackRender && !args.FallbackComponent && !args.fallback) {
    args.fallbackRender = fallbackRender;
  }
  if (!args.onReset) {
    args.onReset = reload;
  }
  return <ReactErrorBoundary {...(args as ReactReactErrorBoundary)} />;
};

export default ErrorBoundary;
