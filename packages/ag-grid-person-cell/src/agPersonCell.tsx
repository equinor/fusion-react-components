import type { ColDef } from 'ag-grid-community';
import { PersonTooltip } from './PersonTooltip';
import { personSortComparator } from './PersonSort';
import { PersonCellRender } from './PersonCellRender';
import type { PersonColDef } from './types';

export const agGridPersonCell = <T,>(col: ColDef & PersonColDef<T>): ColDef => {
  const { azureId, upn, dataSource, dataToSort, heading, subHeading, showAvatar, size } = col;

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
    tooltipComponentParams: {
      azureId: azureId,
      upn: upn,
      dataSource: dataSource,
    },
    tooltipComponent: PersonTooltip,
    tooltipValueGetter: (params) => {
      const fieldValue = params.value;
      return Array.isArray(fieldValue) ? undefined : fieldValue;
    },
    comparator: dataToSort ? personSortComparator(dataToSort) : undefined,
    cellClass: Array.isArray(col.field) ? 'personnel-table-cell' : 'person-table-cell',
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    ...col,
  };
};

export default agGridPersonCell;
