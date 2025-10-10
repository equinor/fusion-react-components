import { PersonCard, type PersonCellData } from '@equinor/fusion-react-person';
import type { ReactElement } from 'react';

type TooltipCard<T> = {
  value: T;
  azureId?: (data: T) => string;
  upn?: (data: T) => string;
  dataSource?: (data: T) => PersonCellData;
};

export const PersonTooltip = <T,>(props: TooltipCard<T>): ReactElement => {
  const { value, azureId, upn, dataSource } = props;
  const azureResult = azureId ? azureId(value) : undefined;
  const upnResult = upn ? upn(value) : undefined;
  const dataSourceResult = dataSource ? dataSource(value) : undefined;

  return (
    <PersonCard size="medium" azureId={azureResult} upn={upnResult} dataSource={dataSourceResult} />
  );
};

export default PersonTooltip;
