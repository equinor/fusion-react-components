import * as PIXI from 'pixi.js-legacy';
import type { ReactElement } from 'react';

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type RenderContext = {
  container: PIXI.Container;
  width: number;
  height: number;
  graphics: PIXI.Graphics;
  createTextNode: (text: string, color: number) => PIXI.Sprite;
};

export type HeaderRenderContext = RenderContext & {
  isHighlighted: boolean;
  isExpanded: boolean;
};

export type ItemRenderContext = RenderContext & {
  createRect: (position: Position, size: Size, color: number) => void;
  addDot: (color: number, position: Position, borderColor?: number) => void;
  addPopover: (hitArea: PIXI.Rectangle, renderPopover: () => ReactElement) => void;
  enquedRender: (key: string, render: (context: ItemRenderContext) => void) => void;
};

export type RenderItem = {
  key: string;
  render: (context: ItemRenderContext) => void;
  context: ItemRenderContext;
};
