export type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrrorProperties = {
  title?: string;
  message?: string;
  type?: ErrorTypes;
};

export { PowerBIReportErrorBoundary } from './PowerBIReportErrorBoundary';

export { default } from './PowerBIReportErrorBoundary';
