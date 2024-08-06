import { CustomTooltipProps } from '@ag-grid-community/react';
import { PersonCard, PersonCellData } from '@equinor/fusion-react-person';

type TooltipCard<T> = {
  azureId?: (data: T) => string;
  upn?: (data: T) => string;
  dataSource?: (data: T) => PersonCellData;
};

export const personTooltip = <T,>(props: CustomTooltipProps & TooltipCard<T>): JSX.Element => {
  const { value, azureId, upn, dataSource } = props;
  const azureResult = azureId ? azureId(value) : undefined;
  const upnResult = upn ? upn(value) : undefined;
  const dataSourceResult = dataSource ? dataSource(value) : undefined;

  return <PersonCard size="medium" azureId={azureResult} upn={upnResult} dataSource={dataSourceResult} />;
};

export default personTooltip;
