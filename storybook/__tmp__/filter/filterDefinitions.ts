import { Filter } from '@equinor/fusion-react-filter';
import {
  AgeBrackets,
  counter,
  createAgeFilterOptions,
  createFilterOptions,
  getAgeBracket,
  getFilter,
  Person,
} from './functions';

export const firstNameCheck: Filter<Person[], string[]> = {
  key: 'firstName',
  title: 'First Name',
  description: 'Persons first name',
  filterFn: getFilter((i) => i.firstName),
  optionsBuilderFn: (data) => createFilterOptions('firstName', data),
  counterFn: (data) => counter(data, (d) => d.firstName),
};
export const lastNameCheck: Filter<Person[], string[]> = {
  key: 'lastName',
  title: 'Last Name',
  description: 'Persons last name',
  filterFn: getFilter((i) => i.lastName),
  optionsBuilderFn: (data) => createFilterOptions('lastName', data),
  counterFn: (data) => counter(data, (d) => d.lastName),
};

export const ageCheck: Filter<Person[], AgeBrackets[]> = {
  key: 'age',
  title: 'Age',
  description: 'Age of people divided into 20 year brackets ',
  filterFn: getFilter((i) => getAgeBracket(i.age)),
  optionsBuilderFn: (data) => createAgeFilterOptions(data),
  counterFn: (data) => counter(data, (p) => getAgeBracket(p.age)),
};

export const statusRadio: Filter<Person[], string> = {
  key: 'status',
  title: 'Status',
  mandatory: true,
  priority: 1,
  resetFilterFn: () => 'all',
  filterFn: (persons, selection) =>
    selection === 'all' ? persons : persons.filter((person) => person.status === selection),
  optionsBuilderFn: () => ({
    options: {
      all: { key: 'all', label: 'All' },
      single: { key: 'single', label: 'Single' },
      complicated: { key: 'complicated', label: 'Complicated' },
      relationship: { key: 'relationship', label: 'Relationship' },
    },
  }),
};
