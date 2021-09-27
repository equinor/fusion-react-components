import { Column, Table, useTableContext } from '@equinor/fusion-react-table';
import { Meta } from '@storybook/react';
import { useMemo } from 'react';

export default {
  title: 'Table/Examples',
  component: Table,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    chromatic: { disableSnapshot: false },
  },
} as Meta;

const columns: Column[] = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
  },
];

const Debugger = () => {
  const { instance } = useTableContext();
  return <pre>{JSON.stringify(instance.state, null, 2)}</pre>;
};

// TODO - generate data
const Template = ({ rows }: { rows: number }) => {
  const options = useMemo(
    () => ({
      data: [],
      columns,
    }),
    [rows]
  );
  return (
    <Table options={options} style={{ minWidth: '100%' }}>
      <Debugger />
    </Table>
  );
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  rows: 10,
};
