export type ItemState = 'new' | 'active' | 'onhold' | 'verification' | 'closed';

type GardenItem = {
  id: string;
  description: string;
  date: Date;
  state: ItemState;
};

export default GardenItem;
