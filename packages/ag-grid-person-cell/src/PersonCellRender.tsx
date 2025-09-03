import { PersonCell } from '@equinor/fusion-react-person';
import type { ICellRendererParams } from 'ag-grid-community';
import type { CustomRenderParams } from './types';
import { PersonnelAvatar } from './PersonnelAvatar';
import { usePersonCellData } from './usePersonCellData';

export const PersonCellRender = <T,>(params: ICellRendererParams & CustomRenderParams<T>) => {
  const { heading, subHeading, azureId, upn, dataSource, showAvatar, value, size } = params;
  const azureResult = azureId ? azureId(value) : undefined;
  const upnResult = upn ? upn(value) : undefined;
  const dataSourceResult = dataSource ? dataSource(value) : undefined;

  const personData = usePersonCellData(azureResult, upnResult, dataSourceResult);

  if (personData.isArray) {
    return (
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {personData.items?.map((item, index) => (
          <PersonnelAvatar
            key={`person-${index}-${item.azureId || item.upn || 'unknown'}`}
            size={size ?? 'small'}
            showAvatar={showAvatar}
            {...item}
          />
        ))}
      </div>
    );
  }

  return (
    <PersonCell
      size={size ?? 'small'}
      heading={heading}
      subHeading={subHeading}
      showAvatar={showAvatar}
      {...personData.single}
    />
  );
};
