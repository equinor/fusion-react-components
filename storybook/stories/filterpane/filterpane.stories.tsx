import { Meta, Story } from '@storybook/react/types-6-0';
import Filter from 'filterpane/src/models/Filter';
import FilterProvider, { CheckBoxFilter, RadioFilter, FilterPanel, FilterSection } from '../../../packages/filterpane';
import FilteredDataTable from './FilteredDataTable';
import { counter, createFilterOptions, getFilter, makeData, Person } from './functions';

export default {
  title: 'Filterpane/Filter types',
  component: FilterProvider,
} as Meta;

type TemplateArgs = { data: Person[] };

const Template: Story<TemplateArgs> = (args) => {
  const firstName: Filter<Person[]> = {
    key: 'firstName',
    title: 'First Name',
    filterFn: getFilter((p) => p.firstName, 'blank'),
    optionsBuilderFn: (data) => createFilterOptions('firstName', data),
    counterFn: (data) => counter(data, (d) => d.firstName),
    priority: 4,
  };

  const radioFilter: Filter<Person[]> = {
    key: 'status',
    title: 'Status',
    filterFn: (persons, s) => (s === 'all' ? persons : persons.filter((person) => person.status === (s as string))),
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

  return (
    <FilterProvider initialData={data} initialFilters={{ firstName: [], status: 'all' }}>
      <FilterPanel>
        <FilterSection useFilterSelector>
          <CheckBoxFilter filter={firstName} useSearch useSelectAll />
          <RadioFilter filter={radioFilter} />
        </FilterSection>
      </FilterPanel>
      <FilteredDataTable />
    </FilterProvider>
  );
};

export const DefaultFilterpane = Template.bind({});
DefaultFilterpane.args = { data: makeData(100) };
