import { TableInstance } from 'react-table';
import { TableData } from '../../types';
import { AllowedExcelTypes, Sheet } from './types';

const isUrl = (value: string) => {
  let url;
  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }
  return true;
};

/**
 * A function to convert a JavaScript value's type to a corresponding Excel type.
 * @param value A value from each column (not the header)
 * @returns Either the same JavaScript type as the parameter, or a corresponding Excel service type
 * @todo The excel service accepts datetime and url types. Able to convert JS number/string to datetime/url?
 */
export const excelTypeConverter = (value: unknown): AllowedExcelTypes => {
  switch (typeof value) {
    case 'number':
    case 'bigint':
      return 'integer';
    case 'string': {
      return isUrl(value) ? 'url' : 'string';
    }
    case 'undefined':
    case 'symbol':
    case 'object':
    case 'function':
      return 'string';

    case 'boolean':
      return 'boolean';

    default:
      return 'string';
  }
};
/**
 * A function for iterating through the table data and constructing an object with columns and rows
 * @param instance The table instance returned from the `useTableContext` hook
 * @returns An array with an object containing two objects; columns and rows.
 */
export const getRowsAndColumns = (instance: TableInstance<TableData>): Sheet[] => {
  const columns = instance.allColumns.map((entry) => {
    const columnId = entry.id;

    /**@todo one way of extracting the types. Check if there is a 'better' way to do it. */
    const columnValue = entry.filteredRows[0].original[columnId];

    return {
      name: columnId,
      type: excelTypeConverter(columnValue),
    };
  });

  const rows = instance.rows.map((entry) => {
    return Object.values(entry.values);
  });

  return [{ columns, rows }];
};
