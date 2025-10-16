import type { SyntheticEvent } from 'react';
import { FusionApiErrorMessage } from '@equinor/fusion';

export type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrorMessageProps = {
  hasError?: boolean;
  errorType?: ErrorTypes;
  message?: unknown;
  resourceName?: string;
  title?: string;
  children?: unknown;
  icon?: unknown;
  action?: string;
  onTakeAction?: (event?: SyntheticEvent<Element, Event>) => void;
};

export type GardenDataErrorTypes = ErrorTypes | 'noCache' | 'NoDataAccess' | 'UnexpectedError';

export type GardenDataError = {
  errorType: GardenDataErrorTypes;
  errorResponse?: FusionApiErrorMessage | null;
};

export type ApiErrorGardenResponse = {
  error: FusionApiErrorMessage & {
    code: GardenDataErrorTypes;
  };
};
