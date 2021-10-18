import { useMemo, useState } from 'react';
import {
  FilterProvider,
  CheckboxFilter,
  RadioFilter,
  FilterPanel,
  FilterSection,
  GeneralBar,
} from '@equinor/fusion-react-filter';
import { firstNameCheck, lastNameCheck, ageCheck, statusRadio } from './filterDefinitions';
//import FilteredDataTable from './FilteredDataTable';
import { makeData, Person } from './functions';

export type FilterpaneProps = { amount: number };

const Filterpane = ({ amount }: FilterpaneProps): JSX.Element => {
  const [minimized, setMinimized] = useState(false);

  const data = useMemo(() => makeData(amount), [amount]);

  const searchFilterFn = (data: Person[], searchString: string) =>
    (searchString as string)?.length
      ? data.filter((d) =>
          `${d.firstName} ${d.lastName} ${d.status} ${d.age}`
            .toLocaleLowerCase()
            .includes((searchString as string).toLocaleLowerCase())
        )
      : data;

  return (
    <FilterProvider initialData={data} initialFilters={{ status: 'all', firstName: [] }}>
      <FilterPanel>
        <GeneralBar onMinimize={() => setMinimized((s) => !s)} minimized={minimized} searchFilterFn={searchFilterFn} />
        <FilterSection isMinimized={minimized} useFilterSelector useFilterSelectorSearch>
          <CheckboxFilter filter={{ ...firstNameCheck }} showSelectAll showSearch compact/>
          <CheckboxFilter filter={{ ...lastNameCheck }} showSelectAll showSearch compact/>
          <CheckboxFilter filter={{ ...ageCheck }} showSelectAll showSearch  compact/>
          <RadioFilter filter={statusRadio} compact/>
        </FilterSection>
      </FilterPanel>
    </FilterProvider>
  );
};

export default Filterpane;
