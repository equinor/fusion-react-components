import { useCallback } from 'react';
import { useHangingGardenContext } from './useHangingGardenContext';
import { HangingGardenColumn } from '../models/HangingGarden';
import useRenderItem from './useItem';
import useHeader from './useHeader';

/**
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */

type UseColumn<T> = {
  renderColumn: (column: HangingGardenColumn<T>, index: number) => void;
};

const useColumn = <T,>(): UseColumn<T> => {
  const {
    scroll: { scrollTop },
    container,
    itemHeight,
    expandedColumns,
  } = useHangingGardenContext();

  const { renderItem } = useRenderItem();
  const { renderHeader } = useHeader();

  const renderColumn = useCallback(
    (column: HangingGardenColumn<T>, index: number) => {
      const startRow = Math.floor(scrollTop.current / itemHeight);
      const offSetHeigth = container.current?.offsetHeight || 0;
      const endRow = Math.min(column.data.length, Math.ceil((scrollTop.current + offSetHeigth) / itemHeight));

      for (let i = startRow; i < endRow; i++) {
        const item = column.data[i];
        item && renderItem(item, i, index);
      }

      renderHeader(column.key, index);
    },
    [renderItem, renderHeader, expandedColumns, container.current?.offsetHeight, scrollTop.current, itemHeight]
  );

  return { renderColumn };
};

export default useColumn;
