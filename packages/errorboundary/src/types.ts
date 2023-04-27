/* Error types for creating messages */
type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrorMessageProps = {
  hasError?: boolean;
  errorType?: ErrorTypes;
  message?: string;
  resourceName?: string;
  title?: string;
  children?: React.ReactChildren;
  icon?: string;
  action?: string;
  onTakeAction?: (event?: React.SyntheticEvent<Element, Event>) => void;
};
