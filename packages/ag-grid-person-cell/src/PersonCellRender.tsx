import { PersonAvatar, PersonCell, type PersonCellData } from '@equinor/fusion-react-person';
import type { ICellRendererParams } from 'ag-grid-community';
import type { CustomRenderParams } from './types';
import { usePersonCellData } from './usePersonCellData';
import { PersonPopover } from './PersonPopover';

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

  if (azureResult === undefined && upnResult === undefined && dataSourceResult === undefined) {
    return null;
  }

  if (personData.isArray) {
    return (
      <div style={{ height: '100%', display: 'flex', gap: '4px', alignItems: 'center' }}>
        {personData.items?.map((item, index) => (
          <PersonPopover key={`person-${index}-${item.azureId || item.upn || 'unknown'}`} {...item}>
            <PersonAvatar
              showLetter={!showAvatar}
              size={size ?? 'small'}
              trigger="none"
              {...item}
            />
          </PersonPopover>
        ))}
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <PersonPopover
        azureId={personData.single?.azureId}
        upn={personData.single?.upn}
        dataSource={personData.single?.dataSource}
      >
        <PersonCell
          size={size ?? 'small'}
          heading={heading}
          subHeading={subHeading}
          showAvatar={showAvatar}
          {...personData.single}
        />
      </PersonPopover>
    </div>
  );
};
