import { AGGridDataStatus } from '.';

export type AGGridData<T extends Record<string, unknown> = Record<string, unknown>> = {
  initial: T;
  current: T;
  status: AGGridDataStatus;
  readonly hasChanged: boolean;
};
