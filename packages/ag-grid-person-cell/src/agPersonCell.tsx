import type { ColDef } from '@equinor/fusion-framework-react-ag-grid/enterprise';
import { personSortComparator } from './personSort';
import { PersonCellRender } from './PersonCellRender';
import type { PersonColDef } from './types';

export const agGridPersonCell = <TRow, TCellValue>(
  col: ColDef<TRow, TCellValue> & PersonColDef<TCellValue>,
): ColDef<TRow, TCellValue> => {
  const { azureId, upn, dataSource, dataToSort, heading, subHeading, showAvatar, size, ...colDef } =
    col;

  return {
    cellRendererParams: {
      azureId: azureId,
      upn: upn,
      dataSource: dataSource,
      heading: heading,
      subHeading: subHeading,
      showAvatar: showAvatar,
      size: size,
    },
    cellRenderer: PersonCellRender,
    comparator: dataToSort ? personSortComparator(dataToSort) : undefined,
    valueFormatter: dataToSort
      ? ({ value }) => (value == null ? '' : (dataToSort(value) ?? ''))
      : undefined,
    cellClass: Array.isArray(col.field) ? 'personnel-table-cell' : 'person-table-cell',
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    ...colDef,
  };
};

export default agGridPersonCell;
