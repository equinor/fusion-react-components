import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { useObservableState } from '@equinor/fusion-observable/react';

import { FilterProvider, useFilterContext } from '@equinor/fusion-react-filter';
import { CheckboxFilter, FilterPanel } from '@equinor/fusion-react-filter/components';
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

import { generateData, DataType } from './generate-data';

const DataLogger = () => {
  const { data$ } = useFilterContext<never, Record<string, DataType>>();
  const { value: data } = useObservableState(data$);
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

type StoryProps = {
  readonly rows: number;
  readonly unique: number;
  readonly filterHeight: number;
};

const customSortFn = <T extends { label: string }>(a: T, b: T) => b.label.localeCompare(a.label);
const customOptions = (item: DataType) => {
  const firstLetter = item.jobType.charAt(1);
  return {
    key: firstLetter,
    value: firstLetter,
    label: `Starting with ${firstLetter.toUpperCase()}`,
  };
};

export const Checkbox: Story<StoryProps> = ({ filterHeight, rows, unique }: StoryProps) => {
  const data = generateData(rows, unique);
  const styles = makeStyles(
    createStyles({
      filters: {
        maxHeight: filterHeight,
      },
    }),
  )();
  return (
    <FilterProvider data={data} initialSelection={{ lastName: new Set([data[0].lastName, data[1].lastName]) }}>
      <FilterPanel showBar showFilters classes={{ filters: styles.filters }} showSelection>
        <CheckboxFilter title="First name" filterKey="firstName" initial={new Set([data[0].firstName])} />
        <CheckboxFilter title="Last name" filterKey="lastName" />
        <CheckboxFilter title="Company" filterKey="company" enableAll />
        <CheckboxFilter title="Job title" filterKey="jobType" sortFn={customSortFn} selector={customOptions} />
      </FilterPanel>
      <DataLogger></DataLogger>
    </FilterProvider>
  );
};

Checkbox.args = {
  rows: 100,
  unique: 5,
  filterHeight: 200,
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
