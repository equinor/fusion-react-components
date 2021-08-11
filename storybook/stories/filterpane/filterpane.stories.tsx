import { Meta, Story } from '@storybook/react/types-6-0';
import { Filter } from '../../../packages/filterpane/src/models/Filter';
import { useState } from 'react';

import FilterProvider, {
  CheckBoxFilter,
  RadioFilter,
  FilterPanel,
  FilterSection,
  GeneralBar,
} from '../../../packages/filterpane';
import FilteredDataTable from './FilteredDataTable';
import { counter, createFilterOptions, getFilter, makeData, Person } from './functions';

export default {
  title: 'Filterpane/Filter types',
  component: FilterProvider,
} as Meta;

type TemplateArgs = { data: Person[] };

const Template: Story<TemplateArgs> = (args) => {
  const firstName: Filter<Person[], string[]> = {
    key: 'firstName',
    title: 'First Name',
    filterFn: getFilter((p) => p.firstName, 'blank'),
    optionsBuilderFn: (data) => createFilterOptions('firstName', data),
    counterFn: (data) => counter(data, (d) => d.firstName),
    priority: 4,
  };

  const radioFilter: Filter<Person[], string> = {
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

  const data = args.data;
  const [minimized, setMinimized] = useState(false);

  const searchFilterFn = (data: Person[], searchString: unknown) =>
    (searchString as string)?.length ? data.filter((d) => d.firstName.includes(searchString as string)) : data;

  return (
    <FilterProvider initialData={data} initialFilters={{ status: 'all' }}>
      <FilterPanel>
        <GeneralBar onMinimize={() => setMinimized((s) => !s)} minimized={minimized} searchFilterFn={searchFilterFn} />
        <FilterSection isMinimized={minimized} useFilterSelector>
          <CheckBoxFilter filter={firstName} useSelectAll />
          <RadioFilter filter={radioFilter} />
        </FilterSection>
      </FilterPanel>
      <FilteredDataTable />
    </FilterProvider>
  );
};

export const DefaultFilterpane = Template.bind({});
DefaultFilterpane.args = { data: makeData(100) };
