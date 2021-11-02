import { useCallback, useState, useMemo } from 'react';
import { Meta, Story } from '@storybook/react';

import {
  FilterProvider,
  CheckboxFilter,
  RadioFilter,
  GeneralBar,
  FilterSection,
  FilterPanel,
  Filter,
  FilterFn,
  FilterOption,
  useFilterStore,
} from '@equinor/fusion-react-filter';

const FilterState = () => {
  const { filteredData, selection } = useFilterStore();
  return (
    <>
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      <h5>Selection</h5>
      <pre>{JSON.stringify(selection, null, 2)}</pre>
    </>
  );
};

export const Test: Story = ({ useFilterSelectorSearch, useFilterSelector, compact, amount = 4 }) => {
  type RelationshipStatus = 'relationship' | 'complicated' | 'single' | 'no-op';
  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    status: RelationshipStatus;
  };

  const [minimized, setMinimized] = useState(false);

  // TODO: import from static json
  const firstName = ['Olav', 'Helge', 'Marit', 'KjerstiKjersti KjerstiKjersti KjerstiKjerstiKjersti'];
  const lastName = ['Strand', 'Våg', 'Haugen', 'Voll'];
  const statuses = ['relationship', 'complicated', 'single', 'no-op'];
  const data = useMemo<Person[]>(
    () =>
      [...new Array(4).keys()].map(
        (index: number) =>
          ({
            firstName: firstName[index],
            lastName: lastName[index],
            age: index + 1 * 20,
            status: statuses[index],
          } as Person)
      ),
    []
  );

  const getFilter = useCallback(
    (getValueFn: (item: Person) => string): FilterFn<Person[], Set<string>> =>
      (data: Person[], selection: Set<string>) => {
        return selection?.keys.length ? data.filter((item) => selection.has(getValueFn(item))) : data;
      },
    []
  );

  const createFilterOptions = useCallback((key: keyof Person) => {
    return (data: Person[]) => {
      const options = data.reduce((cur: Record<string, FilterOption>, item) => {
        const option = String(item[key]);
        return Object.assign(cur, {
          [option]: {
            key: option,
            searchString: option,
            label: option,
          },
        });
      }, {});
      return {
        options,
        sortOrder: Object.keys(options).sort((a, b) => a.localeCompare(b)),
      };
    };
  }, []);

  const counter = useCallback((getItemValue: (item: Person) => string) => {
    return (data: Person[]) => {
      return data.reduce<Record<string, number>>((c, d) => {
        const itemValue = getItemValue(d);
        console.log(88, itemValue);
        return { ...c, [itemValue]: (c[itemValue] || 0) + 1 };
      }, {});
    };
  }, []);

  const firstNameCheck = useMemo<Filter<Person[], Set<string>>>(
    () => ({
      key: 'firstName',
      title: 'First Name',
      description: 'Persons first name',
      filterFn: getFilter((i) => i.firstName),
      optionsBuilderFn: createFilterOptions('firstName'),
      counterFn: counter((d) => d.firstName),
    }),
    [getFilter, createFilterOptions, counter]
  );

  const lastNameCheck = useMemo<Filter<Person[], Set<string>>>(
    () => ({
      key: 'lastName',
      title: 'Last Name',
      description: 'Persons last name',
      filterFn: getFilter((i) => i.lastName),
      optionsBuilderFn: createFilterOptions('lastName'),
      counterFn: counter((d) => d.lastName),
    }),
    [getFilter, createFilterOptions, counter]
  );

  const ageCheck = useMemo<Filter<Person[], string[]>>(
    () => ({
      key: 'age',
      title: 'Age',
      description: 'Age of people divided into 20 year brackets',
      filterFn: getFilter((i) => i.lastName),
      optionsBuilderFn: createFilterOptions('lastName'),
      counterFn: counter(({ age }) => {
        if (age < 20) return '0-19';
        if (age < 40) return '20-39';
        if (age < 60) return '40-59';
        return '60++';
      }),
    }),
    [getFilter, createFilterOptions, counter]
  );

  const statusRadio = useMemo<Filter<Person[], string>>(
    () => ({
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
    }),
    []
  );

  const searchFilterFn = useCallback(
    (data: Person[], searchString: string) =>
      (searchString as string)?.length
        ? data.filter((d) =>
            `${d.firstName} ${d.lastName} ${d.status} ${d.age}`
              .toLocaleLowerCase()
              .includes((searchString as string).toLocaleLowerCase())
          )
        : data,
    []
  );

  return (
    <FilterProvider initialData={data} initialFilters={{ status: 'all' }}>
      <FilterPanel>
        <GeneralBar onMinimize={() => setMinimized((s) => !s)} minimized={minimized} searchFilterFn={searchFilterFn} />
        <FilterSection
          isMinimized={minimized}
          useFilterSelector={useFilterSelector}
          useFilterSelectorSearch={useFilterSelectorSearch}
          compactFilterSelector={compact}
        >
          {/* <RadioFilter filter={statusRadio} compact={compact} /> */}
          <CheckboxFilter filter={{ ...firstNameCheck }} showSelectAll showSearch compact={compact} />
          <CheckboxFilter filter={{ ...lastNameCheck }} showSelectAll compact={compact} />
          {/* <CheckboxFilter filter={{ ...ageCheck }} useSelectAll useSearch compact={compact} /> */}
        </FilterSection>
      </FilterPanel>
      <FilterState />
    </FilterProvider>
  );
};

Test.args = {
  useFilterSelector: false,
  useFilterSelectorSearch: true,
  compact: true,
};

export default {
  title: 'Examples/Filter',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;
