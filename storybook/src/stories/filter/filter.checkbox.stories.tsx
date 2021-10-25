import { Meta } from '@storybook/react';

import { useMemo } from 'react';

import { useObservableState } from '@equinor/fusion-react-observable';

import { FilterProvider, useFilterContext, useSelectionItems } from '@equinor/fusion-react-filter';
import { CheckboxFilter, FilterPanel } from '@equinor/fusion-react-filter/components';

import { generateData, DataType } from './generate-data';

const DataLogger = () => {
  const { data$ } = useFilterContext<never, Record<string, DataType>>();
  const data = useObservableState(data$);
  if (!data?.length) return null;
  return (
    <table width="100%">
      <thead>
        <tr>
          {Object.keys(data[0]).map((x) => (
            <th key={x}>{x}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((x, i) => (
          <tr key={i}>
            {Object.entries(x).map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SelectionLogger = () => {
  const { selection$ } = useFilterContext<never, Record<string, DataType>>();
  const data = Object.entries(useObservableState(selection$) || {}).reduce((acc, [key, value]) => {
    acc[key] = [...(value || [])];
    return acc;
  }, {});
  return <pre>{JSON.stringify(data || {}, null, 2)}</pre>;
};

const FilterLogger = () => {
  const { filter$ } = useFilterContext<never, Record<string, DataType>>();
  const funky$ = useSelectionItems();

  const filter = useObservableState(filter$);
  const data = useObservableState(funky$);
  return (
    <>
      <pre>{JSON.stringify(filter || {}, null, 2)}</pre>
      <pre>{JSON.stringify(data || {}, null, 2)}</pre>
    </>
  );
};

export const Checkbox = () => {
  const data = useMemo(() => generateData(100, 10), []);
  return (
    <FilterProvider data={data} initialSelection={{ lastName: new Set([data[0].lastName, data[1].lastName]) }}>
      <FilterPanel showBar showSelector showFilters>
        <CheckboxFilter title="First name" filterKey="firstName" initial={new Set([data[0].firstName])} />
        <CheckboxFilter title="Last name" filterKey="lastName" />
        <CheckboxFilter title="Company" filterKey="company" />
      </FilterPanel>
      {/* </div> */}
      <hr />
      <DataLogger />
      <hr />
      <FilterLogger />
      {/* <SelectionLogger /> */}
    </FilterProvider>
  );
};

export default {
  title: 'Examples/Filter/Checkbox',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;
