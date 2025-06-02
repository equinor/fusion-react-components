import type { AGGridDataStatus } from './constants';

export type AGGridData<T extends Record<string, unknown> = Record<string, unknown>> = {
  initial: T;
  current: T;
  status: AGGridDataStatus;
  readonly hasChanged: boolean;
};

export type RowCompareFunc = (value1: unknown, value2: unknown) => boolean;
