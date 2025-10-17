import { createContext, useContext, type RefObject, type Dispatch, type SetStateAction, type Context } from 'react';
import * as PIXI from 'pixi.js-legacy';
import { type Caches } from './useTextureCaches';
import { type ExpandedColumns, type ExpandedColumn } from '../models/ExpandedColumn';
import { type ItemRenderContext, type HeaderRenderContext } from '../models/RenderContext';
import { type Scroll } from './useScrolling';
import { type UsePopover } from './usePopover';
import { type ColorMode } from '../models/HangingGarden';

export interface IHangingGardenContext {
  container: RefObject<HTMLDivElement | null>;
  canvas: RefObject<HTMLCanvasElement | null>;
  stage: RefObject<PIXI.Container>;
  pixiApp: RefObject<PIXI.Application | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scroll: Scroll<any>;
  maxRowCount: number;
  setMaxRowCount: Dispatch<SetStateAction<number>>;
  expandedColumns: ExpandedColumns;
  setExpandedColumns: Dispatch<SetStateAction<Record<string, ExpandedColumn>>>;
  textureCaches: Caches;
  backgroundColor: number;
  columns: unknown;
  itemKeyProp: unknown;
  itemHeight: number;
  itemWidth: number;
  headerHeight: number;
  highlightedItem: unknown;
  highlightedColumnKey: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemDescription: (item: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemClick: (item: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItemContext: (item: any, context: ItemRenderContext) => void;
  renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
  popover: UsePopover;
  colorMode: ColorMode;
  groupLevels: number;
  padding: number;
}

const HangingGardenContext: Context<IHangingGardenContext> = createContext<IHangingGardenContext>(
  {} as IHangingGardenContext,
);

export const useHangingGardenContext = (): IHangingGardenContext =>
  useContext<IHangingGardenContext>(HangingGardenContext);

export default HangingGardenContext;
