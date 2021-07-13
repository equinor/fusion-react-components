import { Column, Table, useTableContext } from '@equinor/fusion-react-table';
import { Meta } from '@storybook/react/types-6-0';
import { useMemo } from 'react';

export default {
  title: 'Table/Stories',
  component: Table,
} as Meta;

import { makeData } from './makeData';

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

const Template = ({ rows }: { rows: number }) => {
  const options = useMemo(
    () => ({
      data: makeData(rows),
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

export const DefaultTable = Template.bind({});
DefaultTable.args = {
  rows: 10,
};
