import type { ActionError, Flow } from '@equinor/fusion-observable';
import { Report } from '../../types';
import type { Actions } from './actions';

export type StoreFlow = Flow<Actions, State>;

export enum Status {
  LoadingReport,
  LoadingRequirements,
  LoadingDescription,
  LoadingAccessDescription,
}

export type State = {
  id: string;
  status: Set<Status>;
  initialized?: boolean;
  errors: Array<ActionError>;
  report?: Report;
  requirements?: string;
  description?: string;
  accessDescription?: string;
};
