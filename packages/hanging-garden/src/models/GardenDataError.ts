import { FusionApiErrorMessage } from '@equinor/fusion';

export type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrorMessageProps = {
  hasError?: boolean;
  errorType?: ErrorTypes;
  message?: any;
  resourceName?: string;
  title?: string;
  children?: any;
  icon?: any;
  action?: string;
  onTakeAction?: (event?: React.SyntheticEvent<Element, Event>) => void;
};

export type GardenDataErrorTypes = ErrorTypes | 'noCache' | 'NoDataAccess' | 'UnexpectedError';

export type GardenDataError = {
  errorType: GardenDataErrorTypes;
  errorResponse?: FusionApiErrorMessage | null;
};
