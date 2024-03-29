import { MutableRefObject } from 'react';
import { ItemRenderContext, HeaderRenderContext } from './RenderContext';

export type HangingGardenColumnIndex = Record<string, unknown>;

export type ColumnGroupHeader = {
  key: string;
  type: 'groupHeader';
  level: number;
};

export type HangingGardenColumn<T extends HangingGardenColumnIndex> = {
  key: string;
  data: T[] | HangingGardenColumn<T>[];
};

export type GardenController = {
  clearGarden: () => void;
};

export type ColorMode = 'Regular' | 'Color blind';

export type HangingGardenProps<T extends HangingGardenColumnIndex> = {
  columns: HangingGardenColumn<T>[];
  highlightedColumnKey: string | null;
  highlightedItem: T | null;
  itemKeyProp: keyof T;
  itemWidth: number;
  itemHeight: number;
  getItemDescription: (item: T) => string;
  onItemClick: (item: T) => void;
  headerHeight: number;
  renderItemContext: (item: T, context: ItemRenderContext) => void;
  renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
  provideController?: MutableRefObject<GardenController | null>;
  backgroundColor?: number;
  colorMode?: ColorMode;
  disableScrollToHighlightedItem?: boolean;
  groupLevels?: number;
  padding?: number;
};
