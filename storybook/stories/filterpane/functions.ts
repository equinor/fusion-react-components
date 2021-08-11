import { FilterFn } from '../../../packages/filterpane/src/models/Filter';
import FilterOption, { FilterOptions } from '../../../packages/filterpane/src/models/FilterOption';
import namor from 'namor';

export type RelationshipStatus = 'relationship' | 'complicated' | 'single';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: RelationshipStatus;
};

const newPerson = (): Person => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, saltLength: 0 }),
    lastName: namor.generate({ words: 1, saltLength: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  };
};

export const makeData = (rows: number): Person[] => {
  const range = [...new Array(rows).keys()];
  return range.map(() => newPerson());
};

export const counter = (data: Person[], getItemValue: (item: Person) => string): Record<string, number> =>
  data.reduce<Record<string, number>>((c, d) => {
    const itemValue = getItemValue(d);
    return { ...c, [itemValue]: (c[itemValue] || 0) + 1 };
  }, {});

export const getFilter =
  (getValueFn: (item: Person) => string): FilterFn<Person[], string[]> =>
  (data: Person[], selection: string[]) =>
    selection?.length ? data.filter((item) => selection.includes(getValueFn(item))) : data;

export const createFilterOptions = (key: keyof Person, data: Person[]): FilterOptions => {
  const options = data.reduce((curr: Record<string, FilterOption>, item) => {
    const option = item[key].toString();

    curr[option] = {
      key: option,
      searchString: option,
      label: option,
    };

    return curr;
  }, {});

  return {
    options,
    sortOrder: Object.keys(options).sort((a, b) => a.localeCompare(b)),
  };
};
