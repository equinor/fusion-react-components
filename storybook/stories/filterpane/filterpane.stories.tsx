import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import FilterProvider, {
  CheckBoxFilter,
  RadioFilter,
  FilterPanel,
  FilterSection,
  GeneralBar,
} from '../../../packages/filterpane';
import { firstNameCheck, lastNameCheck, ageCheck, statusRadio } from './filterDefinitions';
import FilteredDataTable from './FilteredDataTable';
import { makeData, Person } from './functions';

export default {
  title: 'Filterpane/Filterpane',
  component: FilterProvider,
} as Meta;

type TemplateArgs = { data: Person[] };

const Template: Story<TemplateArgs> = (args) => {
  const data = args.data;
  const [minimized, setMinimized] = useState(false);

  const searchFilterFn = (data: Person[], searchString: unknown) =>
    (searchString as string)?.length ? data.filter((d) => d.firstName.includes(searchString as string)) : data;

  return (
    <FilterProvider initialData={data} initialFilters={{ status: 'all', firstName: [] }}>
      <FilterPanel>
        <GeneralBar onMinimize={() => setMinimized((s) => !s)} minimized={minimized} searchFilterFn={searchFilterFn} />
        <FilterSection isMinimized={minimized} useFilterSelector>
          <CheckBoxFilter filter={{ ...firstNameCheck }} useSelectAll />
          <CheckBoxFilter filter={{ ...lastNameCheck }} useSelectAll />
          <CheckBoxFilter filter={{ ...ageCheck }} useSelectAll />
          <RadioFilter filter={statusRadio} />
        </FilterSection>
      </FilterPanel>
      <FilteredDataTable />
    </FilterProvider>
  );
};

export const Filterpane = Template.bind({});
Filterpane.args = { data: makeData(10) };
