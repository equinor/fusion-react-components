import { AGGridDataStatus } from './constants';
import { AGGridData, RowCompareFunc } from './types';

const defaultCompareFunc: RowCompareFunc = (value1, value2) => value1 !== value2;

// Diffs Initial values and updated value, if changes is found a diff will be detected
const checkForChanges = (dataRow: AGGridData, rowCompareFunc?: RowCompareFunc) =>
  Object.entries(dataRow.initial).some(([key, value]) => {
    const compareFunction = rowCompareFunc || defaultCompareFunc;
    return compareFunction(dataRow.current[key], value);
  });

/**
 * Add initial, current, status and hasChanges.
 * @field initial will hold the initial data row,
 * @field current will hold the most "up to date" data,
 * @field hasChanges compares the initial and current field
 * @param dataRow The row to be manipulated
 *
 * @param status The status of the row, default FETCHED
 *
 * @returns Data wrapped in AGGridData type
 */
export const addInitialProps = <T extends Record<string, unknown>>(
  dataRow: T,
  status: AGGridDataStatus = AGGridDataStatus.FETCHED,
  rowCompareFunc?: RowCompareFunc,
): AGGridData<T> => ({
  initial: dataRow,
  current: { ...dataRow },
  status,
  get hasChanged() {
    return checkForChanges(this, rowCompareFunc);
  },
});
