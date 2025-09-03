import { PersonCell, type PersonCellData } from '@equinor/fusion-react-person';
import type { ICellRendererParams } from 'ag-grid-community';
import type { CustomRenderParams } from './types';
import { PersonnelAvatar } from './PersonnelAvatar';
import { usePersonCellData } from './usePersonCellData';

export const PersonCellRender = <T,>(params: ICellRendererParams & CustomRenderParams<T>) => {
  const { heading, subHeading, azureId, upn, dataSource, showAvatar, value, size } = params;

  // Helper function to apply selector to data (handles both single items and arrays)
  const applySelector = <R,>(
    selector: ((data: T) => R) | undefined,
    data: T,
  ): R | R[] | undefined => {
    if (!selector) return undefined;

    // If the data itself is an array, map the selector over each item
    if (Array.isArray(data)) {
      const results = data.map((item) => selector(item)).filter((result) => result !== undefined);
      return results.length > 0 ? (results as R[]) : undefined;
    }

    // If data is not an array, apply selector directly
    return selector(data);
  };

  // Apply selectors with automatic array handling
  const azureResult = applySelector(azureId, value) as string | string[] | undefined;
  const upnResult = applySelector(upn, value) as string | string[] | undefined;
  const dataSourceResult = applySelector(dataSource, value) as
    | PersonCellData
    | PersonCellData[]
    | undefined;

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
