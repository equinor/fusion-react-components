import * as PIXI from 'pixi.js-legacy';
import { HangingGardenColumn } from './models/HangingGarden';
import { ExpandedColumn, ExpandedColumns } from './models/ExpandedColumn';
import { ItemRenderContext, Position } from './models/RenderContext';

export const DEFAULT_ITEM_HEIGHT = 24;
export const DEFAULT_HEADER_HEIGHT = 32;
export const POPOVER_MARGIN = 8;
export const EXPANDED_COLUMN_PADDING = 8;
export const HIGHLIGHTED_ITEM_KEY = 'highlighted-item';

export const DEFAULT_ITEM_TEXT_STYLE = new PIXI.TextStyle({
  fontFamily: 'Equinor',
  fill: 'White',
  fontSize: 13,
  align: 'center',
});

export const createTextStyle = (style: PIXI.TextStyle): PIXI.TextStyle => new PIXI.TextStyle(style);

export const getMaxRowCount = (columns: HangingGardenColumn<unknown>[]): number => {
  return Math.max(...columns.map((column) => column.data.length));
};

export const getExpandedWith = (width: number, c: ExpandedColumn): number =>
  (width += c.maxWidth + EXPANDED_COLUMN_PADDING * 2);

export const getColumnX = (index: number, currentExpandedColumns: ExpandedColumns, defaultWidth: number): number => {
  const expandedWidthBeforeIndex = Object.values(currentExpandedColumns)
    .filter((c) => c.index < index && c.isExpanded)
    .reduce(getExpandedWith, 0);

  return index * defaultWidth + expandedWidthBeforeIndex;
};

export const isHeaderExpanded = (columnKey: string, expandedColumns: ExpandedColumns): boolean =>
  (expandedColumns && expandedColumns[columnKey])?.isExpanded;

export const getHeaderWidth = (columnKey: string, expandedColumns: ExpandedColumns, defaultWidth: number): number =>
  isHeaderExpanded(columnKey, expandedColumns)
    ? defaultWidth + expandedColumns[columnKey].maxWidth + EXPANDED_COLUMN_PADDING * 2
    : defaultWidth;

export const getCalculatedHeight = (headerHeight: number, itemHeight: number, maxRowCount: number): number =>
  maxRowCount ? headerHeight + itemHeight * maxRowCount : 0;

export const addDot = (context: ItemRenderContext, color: number, position: Position, borderColor = 0xffffff): void => {
  const circle = new PIXI.Circle(position.x, position.y, 2);

  context.graphics.lineStyle(1, borderColor, 1, 1);
  context.graphics.beginFill(color);
  context.graphics.drawShape(circle);
  context.graphics.endFill();
  context.graphics.lineStyle(0);
};

export const getCalculatedWidth = (
  currentExpandedColumns: ExpandedColumns,
  columnsLength: number,
  itemWidth: number
): number => {
  const expandedWidth = Object.values(currentExpandedColumns)
    .filter((c) => c.isExpanded)
    .reduce(getExpandedWith, 0);
  return columnsLength * itemWidth + expandedWidth;
};

export const createRenderedItemDescription = (backgroundColor: number, textNode: PIXI.Sprite): PIXI.Container => {
  const itemDescription = new PIXI.Container();
  itemDescription.cacheAsBitmap = true;

  // Adding a "transparent" background graphic improves the quality of the description text
  const graphics = new PIXI.Graphics();
  graphics.beginFill(backgroundColor);
  graphics.drawRect(0, 0, textNode.width, textNode.height);
  itemDescription.addChild(graphics);
  itemDescription.addChild(textNode);
  return itemDescription;
};

export const createRoundedRectMask = (width: number, height: number): PIXI.Graphics => {
  const mask = new PIXI.Graphics();
  mask.cacheAsBitmap = true;
  mask.beginFill(0xff3300);
  mask.drawRoundedRect(1, 1, width - 2, height - 2, 4);
  mask.endFill();
  return mask;
};
