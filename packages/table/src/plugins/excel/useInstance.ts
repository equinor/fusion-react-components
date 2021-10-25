import { useCallback } from 'react';
import { TableInstance } from 'react-table';
import actions from './actions';
import { TableData, ColumnType } from '../../types';
import { AllowedExcelTypes, Sheet } from '../../components/toolbar/types';

/**
 * A function to convert a JavaScript value's type to a corresponding Excel type.
 * //TODO: Function will not be needed if ColumnTypes are equal to AllowedExcelTypes
 * @param value A value from each column (not the header)
 * @returns Either the same JavaScript type as the parameter, or a corresponding Excel service type
 * @todo The excel service accepts datetime and url types. Able to convert JS number/string to datetime/url?
 * @todo use dataType from react-table
 */
export const excelTypeConverter = (value: ColumnType | undefined): AllowedExcelTypes => {
  switch (value) {
    case 'boolean':
      return 'boolean';
    case 'datetime':
      return 'datetime';
    case 'number':
      return 'integer';
    case 'text':
      return 'string';
    case 'url':
      return 'url';
    default:
      return 'string';
  }
};
/**
 * A function for iterating through the table data and constructing an object with columns and rows
 * @param instance The table instance returned from the `useTableContext` hook
 * @returns An array with an object containing two objects; columns and rows.
 */
export const getRowsAndColumns = <TData extends TableData>(instance: TableInstance<TData>): Sheet[] => {
  const columns = instance.allColumns.map((entry) => {
    const columnId = entry.id;
    const columnValue = entry.dataType;

    return {
      name: columnId,
      type: excelTypeConverter(columnValue),
    };
  });
  const rows = instance.rows.map((entry) => {
    return Object.values(entry.original);
  });

  return [{ columns, rows }];
};
/**
 * Function to add an anchor tag and emulate a click on it in order to download the file.
 * @param url The url returned from exportFn
 * @param fileName The url returned from exportFn
 */
export const addAnchorAndDownload = (url: string, fileName: string): void => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName + '.xlsx';
  document.body.appendChild(a);
  a.click();

  //TODO: requestAnimationframe(a.remove) results in Illegal invocation
  a.remove();
};

export const useInstance = <TData extends TableData = TableData>(instance: TableInstance<TData>): void => {
  const { dispatch, exportFn } = instance;

  const handleExport = useCallback(async () => {
    try {
      if (!exportFn) return;
      dispatch(actions.export.request());
      const sheets = getRowsAndColumns(instance);
      const { url, fileName } = await exportFn({ sheets });
      dispatch(actions.export.success());
      if (!url) return;
      addAnchorAndDownload(url, fileName);
    } catch (err) {
      dispatch(actions.export.failure(err as Error));
    } finally {
      //TODO: handle this?
    }
  }, [dispatch, instance, exportFn]);

  //TODO: instance.excel
  Object.assign(instance, {
    export: handleExport,
  });
};

export default useInstance;
