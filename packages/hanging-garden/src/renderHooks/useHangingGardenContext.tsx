import { createContext, useContext, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as PIXI from 'pixi.js-legacy';
import { Caches } from './useTextureCaches';
import { ExpandedColumns, ExpandedColumn } from '../models/ExpandedColumn';
import { ItemRenderContext, HeaderRenderContext } from '../models/RenderContext';
import { Scroll } from './useScrolling';
import { UsePopover } from './usePopover';
import { ColorMode } from '../models/HangingGarden';
import { HangingGardenColumn, HangingGardenColumnIndex } from '../models/HangingGarden';

export interface IHangingGardenContext {
  container: MutableRefObject<HTMLDivElement | null>;
  canvas: MutableRefObject<HTMLCanvasElement | null>;
  stage: MutableRefObject<PIXI.Container>;
  pixiApp: MutableRefObject<PIXI.Application | null>;
  scroll: Scroll<HangingGardenColumnIndex>;
  maxRowCount: number;
  setMaxRowCount: Dispatch<React.SetStateAction<number>>;
  expandedColumns: ExpandedColumns;
  setExpandedColumns: Dispatch<SetStateAction<Record<string, ExpandedColumn>>>;
  textureCaches: Caches;
  backgroundColor: number;
  columns: HangingGardenColumn<unknown>[];
  itemKeyProp: unknown;
  itemHeight: number;
  itemWidth: number;
  headerHeight: number;
  highlightedItem: unknown;
  highlightedColumnKey: string | null;
  getItemDescription: (item: unknown) => string;
  onItemClick: (item: unknown) => void;
  renderItemContext: (item: unknown, context: ItemRenderContext) => void;
  renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
  popover: UsePopover;
  colorMode: ColorMode;
}

const HangingGardenContext = createContext<IHangingGardenContext>({} as IHangingGardenContext);

export const useHangingGardenContext = (): IHangingGardenContext =>
  useContext<IHangingGardenContext>(HangingGardenContext);

export default HangingGardenContext;
