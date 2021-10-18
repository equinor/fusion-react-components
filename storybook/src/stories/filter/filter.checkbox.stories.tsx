import { Meta } from '@storybook/react';

import { useMemo } from 'react';

import { useObservableState } from '@equinor/fusion-react-observable';

import { FilterProvider, useFilterContext } from '@equinor/fusion-react-filter/src';
import { CheckboxFilter } from '@equinor/fusion-react-filter/src/components/filter';

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
  const data = useObservableState(selection$);
  return <pre>{JSON.stringify(data || {}, null, 2)}</pre>;
};

export const Checkbox = () => {
  const data = useMemo(() => generateData(100, 10), []);
  return (
    <FilterProvider data={data}>
      <div style={{ display: 'flex', gap: 32, maxHeight: 350, overflow: 'hidden' }}>
        <CheckboxFilter
          title="First name"
          filterKey="firstName"
          selector={(data: DataType) => ({ key: data.firstName, value: data.firstName, label: 'elg' })}
        />
        <CheckboxFilter title="Last name" filterKey="lastName" />
        <CheckboxFilter title="Company" filterKey="company" />
      </div>
      <hr />
      <SelectionLogger />
      <DataLogger />
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
