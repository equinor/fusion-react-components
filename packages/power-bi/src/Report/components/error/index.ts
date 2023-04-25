export type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrorProperties = {
  title?: string;
  message?: string;
  type?: ErrorTypes;
};

export { PowerBIReportErrorBoundary } from './PowerBIReportErrorBoundary';

export { default } from './PowerBIReportErrorBoundary';
