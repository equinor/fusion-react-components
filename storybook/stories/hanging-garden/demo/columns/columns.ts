import { format } from 'date-fns';
import { HangingGardenColumn } from '@equinor/fusion-react-hanging-garden';
import GardenItem, { ItemState } from '../models/garden-item';
import { getStateOrder } from '../helpers';

export const getColumns = (data: GardenItem[]): HangingGardenColumn<GardenItem>[] => {
  const highlightedKey = getYearAndWeekFromDate(new Date());

  const newColumns = data
    .reduce<HangingGardenColumn<GardenItem>[]>((columns, item) => {
      const key = getYearAndWeekFromDate(item.date);
      const column = columns.findIndex((c) => c.key === key);
      column >= 0 ? columns[column].data.push(item) : columns.push({ key, data: [{ ...item }] });

      return columns;
    }, [])
    .map((column) => ({
      ...column,
      data: column.data.sort((a, b) => getStateOrder(a.state) - getStateOrder(b.state)),
    }));

  const highlightedKeyIndex = newColumns.findIndex((c) => c.key === highlightedKey);
  if (highlightedKey && highlightedKeyIndex === -1) {
    newColumns.push({ key: highlightedKey, data: [] });
  }

  return newColumns.sort(({ key: a }, { key: b }) => a.localeCompare(b));
};

export const getYearAndWeekFromDate = (date: Date): string => format(date, 'yyyy/II', { weekStartsOn: 1 });

export const createDataSet = (itemsCount = 1000, dayDiff = 200): GardenItem[] => {
  const states: ItemState[] = ['new', 'active', 'onhold', 'verification', 'closed'];
  const items: GardenItem[] = [];
  for (let item = 0; item < itemsCount; item++) {
    const addDays = Math.floor(Math.random() * (-dayDiff - dayDiff)) + dayDiff;
    const date = new Date();
    date.setDate(date.getDate() + addDays);

    items.push({
      id: item.toString(),
      description: `This is ITEM number ${item}`,
      date: date,
      state: states[Math.floor(Math.random() * 5)],
    });
  }
  return items;
};

export const fetchGardenItemsAsync = (itemsCount?: number, dayDiff?: number): Promise<unknown> =>
  new Promise<unknown>((resolve) => {
    resolve({
      status: 200,
      data: createDataSet(itemsCount, dayDiff),
    });
  });
