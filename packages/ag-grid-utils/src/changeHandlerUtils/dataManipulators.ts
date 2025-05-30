import { AGGridDataStatus } from './constants';
import type { AGGridData, RowCompareFunc } from './types';

/**
 * Default compare function used to compare row values.
 * @param value1 - The first value to compare.
 * @param value2 - The second value to compare.
 * @returns A boolean value indicating whether the values are different.
 */
export const defaultCompareFunc: RowCompareFunc = (value1, value2) => value1 !== value2;

/**
 * Checks if there are any changes in the data row object.
 * @param dataRow - The data row object to check for changes.
 * @param rowCompareFunc - Optional function used to compare row values. If not provided, a default compare function will be used.
 * @returns A boolean value indicating whether there are any changes in the data row.
 */
export const checkForChanges = (dataRow: AGGridData, rowCompareFunc?: RowCompareFunc): boolean => {
  const compareFunction = rowCompareFunc ?? defaultCompareFunc;
  return Object.entries(dataRow.initial).some(([key, value]) =>
    compareFunction(dataRow.current[key], value),
  );
};

/**
 * Add initial, current, status and hasChanges properties to the data row.
 * @template T - data type
 * @param dataRow - The row to be manipulated.
 * @param status - The status of the row. Default value is AGGridDataStatus.FETCHED.
 * @param rowCompareFunc - Optional function used to compare row values. If not provided, a default compare function will be used.
 * @returns The data row wrapped in AGGridData type.
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
