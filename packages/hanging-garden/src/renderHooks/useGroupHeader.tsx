import { useCallback } from 'react';
import * as PIXI from 'pixi.js-legacy';
import { useHangingGardenContext } from './useHangingGardenContext';
import { getColumnX, addDot, GROUP_LEVEL_OFFSET, isHeaderExpanded, getHeaderWidth } from '../utils';
import { Size, Position, ItemRenderContext } from '../models/RenderContext';
import useTextNode from './useTextNode';
import useRenderQueue from './useRenderQueue';
import { HangingGardenColumn, HangingGardenColumnIndex } from '../models/HangingGarden';

/**
 * Renders the basic grouped header based.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */

type UseGroupHeader = {
  renderGroupHeader: (key: string, index: number, columnIndex: number, level: number) => void;
};

const useGroupHeader = <T extends HangingGardenColumnIndex>(): UseGroupHeader => {
  const {
    pixiApp,
    stage,
    expandedColumns,
    columns,
    highlightedColumnKey,
    itemWidth,
    itemHeight,
    headerHeight,
    scroll: { scrollTop },
    textureCaches: { getTextureFromCache, addTextureToCache },
    popover: { addPopover },
    groupLevels,
  } = useHangingGardenContext();

  const { enqueueRenderer, processRenderQueue, processRenderQueueAnimationFrame } = useRenderQueue();

  const { createTextNode } = useTextNode();

  const createRect = useCallback(
    (position: Position, size: Size, color: number) => {
      const { x, y } = position;
      const { width, height } = size;

      const key = '' + color + x + y + width + height;
      let cachedRect = getTextureFromCache('rects', key) as PIXI.RenderTexture;

      if (!cachedRect) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawRoundedRect(x, y, width - 2, height - 2, 4);
        graphics.endFill();
        cachedRect = PIXI.RenderTexture.create({ width, height });
        pixiApp.current?.renderer.render(graphics, cachedRect as PIXI.IRendererRenderOptions);
        addTextureToCache('rects', key, cachedRect);
      }

      return new PIXI.Sprite(cachedRect);
    },
    [pixiApp, getTextureFromCache, addTextureToCache],
  );

  const renderGroupHeaderContext = useCallback(
    (key: string, groupHeaderContext: ItemRenderContext, level: number, expanded?: string) => {
      groupHeaderContext.createRect(
        { x: 0, y: 0 },
        { width: groupHeaderContext.width, height: groupHeaderContext.height },
        0xffffff,
      );

      groupHeaderContext.enquedRender(key + level + expanded, (context) => {
        const textNode = context.createTextNode(key, 0x000000);
        context.graphics.addChild(textNode);
        textNode.x = 2 + GROUP_LEVEL_OFFSET * level;
        textNode.y = (context.height - textNode.height) / 2;
      });
    },
    [],
  );

  const renderGroupHeader = useCallback(
    (key: string, index: number, columnIndex: number, level: number) => {
      const columnKey = (columns as HangingGardenColumn<T>[])[columnIndex]?.key;
      const expanded = isHeaderExpanded(columnKey, expandedColumns) ? 'expanded' : '';
      const textureName = 'groupByHeader' + key + index + columnIndex + level + expanded;
      const headerWidth = getHeaderWidth(columnKey, expandedColumns, itemWidth, level);
      const x = getColumnX(columnIndex, expandedColumns, itemWidth, groupLevels);
      const y = headerHeight + index * itemHeight;

      let renderedGroupHeader = getTextureFromCache('headers', textureName) as PIXI.Container;

      if (!renderedGroupHeader || renderedGroupHeader.width !== headerWidth) {
        renderedGroupHeader = new PIXI.Container();
        renderedGroupHeader.x = x;
        renderedGroupHeader.y = y;
        renderedGroupHeader.width = headerWidth;
        renderedGroupHeader.height = itemHeight;

        const graphicsContext = new PIXI.Graphics();
        graphicsContext.cacheAsBitmap = true;
        renderedGroupHeader.addChild(graphicsContext);

        const groupHeaderContext: ItemRenderContext = {
          container: renderedGroupHeader,
          width: headerWidth,
          height: itemHeight,
          graphics: graphicsContext,
          createTextNode: createTextNode,
          addDot: (color, position, borderColor) =>
            enqueueRenderer(
              '' + color + position.x + position.y + borderColor,
              (context) => addDot(context, color, position, borderColor),
              groupHeaderContext,
            ),
          addPopover: (hitArea, renderPopover) => addPopover(renderedGroupHeader, hitArea, renderPopover),
          createRect: (position, size, color) => graphicsContext.addChild(createRect(position, size, color)),
          enquedRender: (key, render) => enqueueRenderer(key, render, groupHeaderContext),
        };

        renderGroupHeaderContext(key, groupHeaderContext, level, expanded);

        addTextureToCache('headers', textureName, renderedGroupHeader);
      }

      renderedGroupHeader.x = x;
      renderedGroupHeader.y = y;
      stage.current.addChild(renderedGroupHeader);
    },
    [
      getTextureFromCache,
      addTextureToCache,
      highlightedColumnKey,
      expandedColumns,
      columns,
      itemWidth,
      headerHeight,
      stage.current,
      createTextNode,
      scrollTop.current,
      enqueueRenderer,
      processRenderQueue,
      processRenderQueueAnimationFrame,
      groupLevels,
    ],
  );

  return { renderGroupHeader };
};

export default useGroupHeader;
