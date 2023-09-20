import { createContext, useContext, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as PIXI from 'pixi.js-legacy';
import { Caches } from './useTextureCaches';
import { ExpandedColumns, ExpandedColumn } from '../models/ExpandedColumn';
import { ItemRenderContext, HeaderRenderContext } from '../models/RenderContext';
import { Scroll } from './useScrolling';
import { UsePopover } from './usePopover';
import { ColorMode } from '../models/HangingGarden';

export interface IHangingGardenContext {
  container: MutableRefObject<HTMLDivElement | null>;
  canvas: MutableRefObject<HTMLCanvasElement | null>;
  stage: MutableRefObject<PIXI.Container>;
  pixiApp: MutableRefObject<PIXI.Application | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scroll: Scroll<any>;
  maxRowCount: number;
  setMaxRowCount: Dispatch<React.SetStateAction<number>>;
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

const HangingGardenContext: React.Context<IHangingGardenContext> = createContext<IHangingGardenContext>(
  {} as IHangingGardenContext,
);

export const useHangingGardenContext = (): IHangingGardenContext =>
  useContext<IHangingGardenContext>(HangingGardenContext);

export default HangingGardenContext;