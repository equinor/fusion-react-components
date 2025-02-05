import { ColDef, ICellRendererParams } from '@equinor/fusion-framework-module-ag-grid/src/community';
import { PersonCellData, PersonCell, PersonItemSize } from '@equinor/fusion-react-person';
import { personTooltip } from './personTooltip';
import { personSortComparator } from './personSort';

type CustomRenderParams<T> = {
  azureId?: (data: T) => string | undefined;
  upn?: (data: T) => string | undefined;
  dataSource?: (data: T) => PersonCellData;
  heading?: <P extends PersonCellData>(person: P) => string | undefined;
  subHeading?: <P extends PersonCellData>(person: P) => string | undefined;
  showAvatar?: boolean;
  size?: PersonItemSize;
};

type PersonColDef<T> = CustomRenderParams<T> & {
  dataToSort?: (data: T) => string | undefined;
};

const renderPersonCell = <T,>(params: ICellRendererParams & CustomRenderParams<T>) => {
  const { heading, subHeading, azureId, upn, dataSource, showAvatar, value, size } = params;
  const azureResult = azureId ? azureId(value) : undefined;
  const upnResult = upn ? upn(value) : undefined;
  const dataSourceResult = dataSource ? dataSource(value) : undefined;

  return (
    <PersonCell
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
