import { Meta, StoryObj } from '@storybook/react-vite';

import { useObservableState } from '@equinor/fusion-observable/react';

import { FilterProvider } from '@equinor/fusion-react-filter/src/FilterProvider';
import { FilterPanel, FilterPanelProps } from '@equinor/fusion-react-filter/src/components/panel/FilterPanel';
import { CheckboxFilter } from '@equinor/fusion-react-filter/src/components/filter/checkbox';
import { useFilterContext } from '@equinor/fusion-react-filter/src/hooks';

import { generateData, DataType } from './generate-data';

const meta: Meta<FilterPanelProps<DataType>> = {
  title: 'data/Filter',
  component: FilterPanel,
};

export default meta;

type Story = StoryObj<FilterPanelProps<DataType>>;

const DataLogger = () => {
  const { data$ } = useFilterContext<never, Record<string, DataType>>();
  const { value: data } = useObservableState(data$);
  if (!data?.length) return null;
  return (
    <table width="100%">
      <thead>
        <tr>
          {Object.keys(data[0])
            .filter((key) => key !== 'id')
            .map((key) => (
              <th key={key}>{key}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.id}>
            {Object.entries(entry)
              .filter(([entryKey]) => entryKey !== 'id')
              .map(([entryKey, entryValue]) => (
                <td key={entry.id + entryKey}>{entryValue}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const filter_panel_story: Story = {
  name: 'FilterPanel',
  args: {
    showBar: true,
    showFilters: true,
    showSelection: true,
  },
  render: (props) => {
    const data = generateData(100, 10);
    return (
      <FilterProvider data={data} initialSelection={{ lastName: new Set([data[0].lastName, data[1].lastName]) }}>
        <FilterPanel {...props}>
          <CheckboxFilter title="First name" filterKey="firstName" initial={new Set([data[0].firstName])} />
          <CheckboxFilter title="Last name" filterKey="lastName" />
          <CheckboxFilter title="Company" filterKey="company" enableAll />
          <CheckboxFilter
            title="Job title"
            filterKey="jobType"
            sortFn={(a, b) => b.label.localeCompare(a.label)}
            selector={(item) => {
              const firstLetter = item.jobType.charAt(1);
              return {
                key: firstLetter,
                value: firstLetter,
                label: `Starting with ${firstLetter.toUpperCase()}`,
              };
            }}
          />
        </FilterPanel>
        <DataLogger />
      </FilterProvider>
    );
  },
};
