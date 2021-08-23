import { useCallback } from 'react';
import { useHangingGardenContext } from './useHangingGardenContext';
import { ColumnGroupHeader, HangingGardenColumn, HangingGardenColumnIndex } from '../models/HangingGarden';
import useRenderItem from './useItem';
import useHeader from './useHeader';
import useGroupHeader from './useGroupHeader';
import { flattenColumn } from '../utils';

/**
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */

type UseColumn<T extends HangingGardenColumnIndex> = {
  renderColumn: (column: HangingGardenColumn<T>, index: number) => void;
};

const useColumn = <T extends HangingGardenColumnIndex>(): UseColumn<T> => {
  const {
    scroll: { scrollTop },
    container,
    itemHeight,
    expandedColumns,
  } = useHangingGardenContext();

  const { renderItem } = useRenderItem();
  const { renderHeader } = useHeader();
  const { renderGroupHeader } = useGroupHeader();

  const isMultiGrouped = (columns: T[] | HangingGardenColumn<T>[]): columns is HangingGardenColumn<T>[] => {
    const columnType = columns[0] as HangingGardenColumn<T>;

    return Boolean(columnType?.key && columnType?.data);
  };

  const isGroupheader = (item: T | ColumnGroupHeader): item is ColumnGroupHeader =>
    Boolean((item as ColumnGroupHeader)?.type === 'groupHeader');

  const renderGroupedItems = useCallback(
    (items: HangingGardenColumn<T>, startRow: number, index: number) => {
      const flattenedColumn = flattenColumn(items);

      const endRow = Math.min(
        flattenedColumn.length,
        Math.ceil((scrollTop.current + (container.current?.offsetHeight || 0)) / itemHeight)
      );

      for (let i = startRow; i < endRow; i++) {
        const item = flattenedColumn[i];

        isGroupheader(item) ? renderGroupHeader(item.key, i, index, item.level) : renderItem(item, i, index);
      }
    },
    [renderItem]
  );

  const renderItems = useCallback(
    (items: T[], startRow: number, endRow: number, index: number) => {
      for (let i = startRow; i < endRow; i++) {
        const item = items[i];
        item && renderItem(item, i, index);
      }
    },
    [renderItem]
  );

  const renderColumn = useCallback(
    (column: HangingGardenColumn<T>, index: number) => {
      const startRow = Math.floor(scrollTop.current / itemHeight);
      const offSetHeight = container.current?.offsetHeight || 0;

      const endRow = Math.min(column.data.length, Math.ceil((scrollTop.current + offSetHeight) / itemHeight));

      isMultiGrouped(column.data)
        ? renderGroupedItems(column, startRow, index)
        : renderItems(column.data, startRow, endRow, index);

      renderHeader(column.key, index);
    },
    [
      renderGroupedItems,
      renderItems,
      renderHeader,
      expandedColumns,
      container.current?.offsetHeight,
      scrollTop.current,
      itemHeight,
    ]
  );

  return { renderColumn };
};

export default useColumn;
