import { ItemState } from './models/GardenItem';
import { PIXI } from '@equinor/fusion-react-hanging-garden';

const StateColorMap: Record<ItemState, string> = {
  new: '#D9EAF2',
  active: '#BCF316',
  onhold: '#60F316',
  verification: '#F0A875',
  closed: '#0D59F2',
};

export const getStateColor = (state: ItemState): string => StateColorMap[state];
export const getStateColorHex = (state: ItemState): number => PIXI.utils.string2hex(StateColorMap[state]);

const StateOrder: Record<ItemState, number> = {
  new: 1,
  active: 2,
  onhold: 3,
  verification: 4,
  closed: 5,
};

export const getStateOrder = (state: ItemState): number => StateOrder[state];
