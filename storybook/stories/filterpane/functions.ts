import { FilterFn } from '../../../packages/filterpane/src/models/Filter';
import FilterOption, { FilterOptions } from '../../../packages/filterpane/src/models/FilterOption';

export type RelationshipStatus = 'relationship' | 'complicated' | 'single';
const firstName = ['Olav', 'Helge', 'Marit', 'Kjersti'];
const lastName = ['Strand', 'Våg', 'Haugen', 'Voll'];

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  status: RelationshipStatus;
};

const newPerson = (): Person => {
  const statusChance = Math.random();
  return {
    firstName: firstName[Math.floor(Math.random() * 4)],
    lastName: lastName[Math.floor(Math.random() * 4)],
    age: Math.floor(Math.random() * 80),
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

export type AgeBrackets = '0-19' | '20-39' | '40-59' | '60++';
export const getAgeBracket = (age: number): AgeBrackets => {
  if (age < 20) return '0-19';
  if (age < 40) return '20-39';
  if (age < 60) return '40-59';

  return '60++';
};

export const createAgeFilterOptions = (data: Person[]): FilterOptions => {
  const options = data.reduce((curr: Record<string, FilterOption>, item) => {
    const option = getAgeBracket(item.age);

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
