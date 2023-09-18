import * as PIXI from 'pixi.js-legacy';
import { ColumnGroupHeader, HangingGardenColumn, HangingGardenColumnIndex } from './models/HangingGarden';
import { ExpandedColumn, ExpandedColumns } from './models/ExpandedColumn';
import { ItemRenderContext, Position } from './models/RenderContext';
import { Vector2 } from './components/Vector2';

export const DEFAULT_ITEM_HEIGHT = 24;
export const DEFAULT_HEADER_HEIGHT = 32;
export const GROUP_LEVEL_OFFSET = 8;
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

export const getMaxRowCount = <T extends HangingGardenColumnIndex>(columns: HangingGardenColumn<T>[]): number => {
  return Math.max(...columns.map((column) => flattenColumn(column).length));
};

export const getExpandedWith = (width: number, c: ExpandedColumn): number =>
  (width += c.maxWidth + EXPANDED_COLUMN_PADDING * 2);

export const getColumnX = (
  index: number,
  currentExpandedColumns: ExpandedColumns,
  defaultWidth: number,
  groupLevels: number,
): number => {
  const expandedWidthBeforeIndex = Object.values(currentExpandedColumns)
    .filter((c) => c.index < index && c.isExpanded)
    .reduce(getExpandedWith, 0);

  return index * (defaultWidth + groupLevels * GROUP_LEVEL_OFFSET) + expandedWidthBeforeIndex;
};

export const isHeaderExpanded = (columnKey: string, expandedColumns: ExpandedColumns): boolean =>
  (expandedColumns && expandedColumns[columnKey])?.isExpanded;

export const getHeaderWidth = (
  columnKey: string,
  expandedColumns: ExpandedColumns,
  defaultWidth: number,
  groupLevels: number,
): number =>
  isHeaderExpanded(columnKey, expandedColumns)
    ? defaultWidth +
      expandedColumns[columnKey].maxWidth +
      EXPANDED_COLUMN_PADDING * 2 +
      groupLevels * GROUP_LEVEL_OFFSET
    : defaultWidth + groupLevels * GROUP_LEVEL_OFFSET;

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
  itemWidth: number,
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

export const isMultiGrouped = <T extends HangingGardenColumnIndex>(
  columns: T[] | HangingGardenColumn<T>[],
): columns is HangingGardenColumn<T>[] => {
  const columnType = columns[0] as HangingGardenColumn<T>;

  return Boolean(columnType?.key && columnType?.data);
};

/**
 *
 * @param flattenedGroups current accumulated items in the column
 * @param group a grouped that needs to be flattened and added to flattenedGroups
 * @param level current grouping level
 * @returns flat Array
 *
 * Moves it way down the groups and flattens the nested arrays.
 * Creates a Header for each group, and the adds the items or the next group under it.
 * Ending up with a flat array ready for rendering in the Garden
 */

const flattenGroup = <T extends HangingGardenColumnIndex>(
  flattenedGroups: (T | ColumnGroupHeader)[],
  group: HangingGardenColumn<T>,
  level: number,
): (T | ColumnGroupHeader)[] => {
  if (isMultiGrouped(group.data)) {
    return [
      ...flattenedGroups,
      { key: group.key, type: 'groupHeader', level: level },
      ...group.data.reduce(
        (flattenedGroups: (T | ColumnGroupHeader)[], g) => flattenGroup(flattenedGroups, g, level + 1),
        [],
      ),
    ];
  }

  flattenedGroups.push({ key: group.key, type: 'groupHeader', level: level }, ...Object.values(group.data));

  return flattenedGroups;
};

/**
 *
 * @param column columns that might need to be flattened
 * @returns columns, flattened into one array per column, without grouping, in correct order for rendering. May contain both Items and ColumnGroupHeaders
 *
 * checks if the columns data is grouped, is not returns the columns.
 * else reduces the Columns into a flat array of items and group by headers.
 */
export const flattenColumn = <T extends HangingGardenColumnIndex>(
  column: HangingGardenColumn<T>,
): (ColumnGroupHeader | T)[] =>
  isMultiGrouped(column.data)
    ? column.data.reduce(
        (flattenedGroups: (T | ColumnGroupHeader)[], group) => flattenGroup(flattenedGroups, group, 0),
        [],
      )
    : column.data;

PIXI.Graphics.prototype.drawDashLine = function (this: PIXI.Graphics, toX: number, toY: number, dash = 12, gap = 5) {
  const lastPosition = this.currentPath.points;
  const from = new Vector2(lastPosition[lastPosition.length - 2] || 0, lastPosition[lastPosition.length - 1] || 0);
  const to = new Vector2(toX, toY);
  const a = from.x - to.x;
  const b = from.y - to.y;
  const distance = Math.sqrt(a * a + b * b);
  const v = new Vector2();
  for (let i = dash + gap; i <= distance; i += dash + gap) {
    v.lerpVectors(from, to, (i - gap) / distance);
    this.lineTo(v.x, v.y);
    v.lerpVectors(from, to, i / distance);
    this.moveTo(v.x, v.y);
  }
  this.lineTo(to.x, to.y);
};
