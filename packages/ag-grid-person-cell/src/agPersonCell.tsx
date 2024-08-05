import { ColDef, ICellRendererParams } from '@ag-grid-community/core';
import { TableCellData, PersonTableCell, PersonItemSize } from '@equinor/fusion-react-person';
import { personTooltip } from './personTooltip';
import { personSortComparator } from './personSort';

type CustomRenderParams = {
  azureId?: (data: any) => string;
  upn?: (data: any) => string;
  dataSource?: (data: any) => TableCellData;
  heading?: <T extends TableCellData>(person: T) => string | undefined;
  subHeading?: <T extends TableCellData>(person: T) => string | undefined;
  showAvatar?: boolean;
  size?: PersonItemSize;
};

type PersonColDef = CustomRenderParams & {
  dataToSort?: (data: any) => string | undefined;
};

const renderPersonCell = (params: ICellRendererParams & CustomRenderParams) => {
  const { heading, subHeading, azureId, upn, dataSource, showAvatar, value, size } = params;
  const azureResult = azureId ? azureId(value) : undefined;
  const upnResult = upn ? upn(value) : undefined;
  const dataSourceResult = dataSource ? dataSource(value) : undefined;

  return (
    <PersonTableCell
      size={size ?? 'small'}
      azureId={azureResult}
      upn={upnResult}
      dataSource={dataSourceResult}
      heading={heading}
      subHeading={subHeading}
      showAvatar={showAvatar}
    />
  );
};

export const agGridPersonCell = (col: ColDef & PersonColDef): ColDef => {
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
    cellRenderer: renderPersonCell,
    tooltipComponentParams: {
      azureId: azureId,
      upn: upn,
      dataSource: dataSource,
    },
    tooltipComponent: personTooltip,
    tooltipField: col.field,
    comparator: dataToSort ? personSortComparator(dataToSort) : undefined,
    cellClass: 'person-table-cell',
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    ...col,
  };
};

export default agGridPersonCell;
