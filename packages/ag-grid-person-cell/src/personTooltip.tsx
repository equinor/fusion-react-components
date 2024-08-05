import { CustomTooltipProps } from '@ag-grid-community/react';
import { PersonCard, TableCellData } from '@equinor/fusion-react-person';

type TooltipCard = {
  azureId?: (data: any) => string;
  upn?: (data: any) => string;
  dataSource?: (data: any) => TableCellData;
};

export const personTooltip = (props: CustomTooltipProps & TooltipCard): JSX.Element => {
  const { value, azureId, upn, dataSource } = props;
  const azureResult = azureId ? azureId(value) : undefined;
  const upnResult = upn ? upn(value) : undefined;
  const dataSourceResult = dataSource ? dataSource(value) : undefined;

  return <PersonCard size="medium" azureId={azureResult} upn={upnResult} dataSource={dataSourceResult} />;
};

export default personTooltip;
