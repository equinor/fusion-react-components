/* Error types for creating messages */
type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrorBoundaryProps = {
  hasError?: boolean;
  errorType?: ErrorTypes;
  message?: string;
  resourceName?: string;
  title?: string;
  icon?: string;
  action?: string;
  onTakeAction?: (event?: React.SyntheticEvent<Element, Event>) => void;
};
