import { useCallback } from 'react';
import * as PIXI from 'pixi.js-legacy';
import { useHangingGardenContext } from './useHangingGardenContext';
import useTextNode from './useTextNode';
import { createRenderedItemDescription, getColumnX, EXPANDED_COLUMN_PADDING, GROUP_LEVEL_OFFSET } from '../utils';
import { HangingGardenColumn, HangingGardenColumnIndex } from '../models/HangingGarden';

/**
 * Handles extended descriptions for item when columns is expanded.
 * Only apply if expanded columns are in use.
 *
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */

type UseItemDescription<T> = {
  renderItemDescription: (item: T, index: number, columnIndex: number) => void;
  getRenderedItemDescription: (item: T) => PIXI.Container;
};

const useItemDescription = <T extends HangingGardenColumnIndex>(): UseItemDescription<T> => {
  const {
    stage,
    backgroundColor,
    columns,
    expandedColumns,
    headerHeight,
    itemHeight,
    itemWidth,
    itemKeyProp,
    getItemDescription,
    textureCaches: { getTextureFromCache, addTextureToCache },
    groupLevels,
  } = useHangingGardenContext();

  const { createTextNode } = useTextNode();

  const getRenderedItemDescription = useCallback(
    (item: T) => {
      let itemDescription = getTextureFromCache('descriptions', item[itemKeyProp as keyof T] as string);

      if (!itemDescription) {
        const description = getItemDescription(item);
        const textNode = createTextNode(description, 0x243746);
        itemDescription = createRenderedItemDescription(backgroundColor, textNode);
        addTextureToCache('descriptions', item[itemKeyProp as keyof T] as string, itemDescription);
      }
      return itemDescription as PIXI.Container;
    },
    [backgroundColor, getTextureFromCache, addTextureToCache, getItemDescription]
  );

  const renderItemDescription = useCallback(
    (item: T, index: number, columnIndex: number) => {
      const column = (columns as HangingGardenColumn<T>[])[columnIndex];
      const expandedColumn = expandedColumns && expandedColumns[column.key];

      if (!expandedColumn || !expandedColumn.isExpanded) {
        return;
      }

      const pixiContainer = getRenderedItemDescription(item);
      pixiContainer.y = headerHeight + index * itemHeight + (itemHeight / 2 - pixiContainer.height / 2);
      pixiContainer.x =
        getColumnX(columnIndex, expandedColumns, itemWidth, groupLevels) +
        itemWidth +
        groupLevels * GROUP_LEVEL_OFFSET +
        EXPANDED_COLUMN_PADDING;
      stage.current.removeChild(pixiContainer);
      stage.current.addChild(pixiContainer);
    },
    [
      headerHeight,
      columns,
      expandedColumns,
      getColumnX,
      itemHeight,
      itemWidth,
      getRenderedItemDescription,
      stage.current,
    ]
  );

  return { renderItemDescription, getRenderedItemDescription };
};

export default useItemDescription;
