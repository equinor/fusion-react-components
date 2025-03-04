import { ColDef, GetRowIdParams, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import { AGGridDataStatus } from './constants';
import { checkForChanges } from './dataManipulators';
import { StatusComponent } from './StatusComponent';

/**
 * Value getter, gets the "current" prop in the data set
 * @param params  Getter params provided by Ag grid
 * @returns Value from the getter
 */
export const defaultValueGetter = (params: ValueGetterParams): unknown => {
  const field = params.colDef.field;
  if (!field) {
    throw new Error('Missing field in column def');
  }
  return params.data.current[params.colDef.field || ''];
};

/**
 * Value setter, updated the "current" prop in the data set
 * @param params Setter params provided by Ag grid
 * @returns Boolean value, determines if the field should be updated or not
 */
export const defaultValueSetter = (params: ValueSetterParams): boolean => {
  const field = params.colDef.field;
  if (!field) {
    throw new Error('Missing field in column def');
  }
  params.data.current[field] = params.newValue;
  if (params.data.status !== AGGridDataStatus.NEW) {
    params.data.status = checkForChanges(params.data) ? AGGridDataStatus.PATCHED : AGGridDataStatus.FETCHED;
  }
  return true;
};

/**
 * Use this function to populate the "getRowId" prop in the grid options.
 * It will get the id in the current prop
 * @param idProp prop used to access the unique identifier in the data set, eg. "id"
 * @returns getter function for id
 */
export const getDefaultId =
  (idProp: string) =>
  (param: GetRowIdParams): unknown =>
    param.data.current[idProp];

/**
 * Creates a new column field that tracks changes for each row
 * @param customDefs custom column defs
 * @returns column definition for status column
 */
export const createStatusField = (customDefs?: ColDef): ColDef => ({
  headerName: 'Status',
  floatingFilter: false,
  editable: false,
  maxWidth: 100,
  cellRenderer: StatusComponent,
  /** rerender when the status of the row changes */
  valueGetter: (params: ValueGetterParams) => params.data.status,
  enableCellChangeFlash: false,
  ...customDefs,
});
