import { Column, Table, useTableContext, PaginationLayout } from '@equinor/fusion-react-table';
import { Meta } from '@storybook/react';
import { useMemo } from 'react';
import makeData from './makeData';
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
  const foo = {
    canNextPage: instance.canNextPage,
    canPreviousPage: instance.canPreviousPage,
    ...instance.state,
  };
  return <pre>{JSON.stringify(foo, null, 2)}</pre>;
};

type StoryProps = { rows: number };
export const PaginationTable = ({ rows = 50 }: StoryProps): React.ReactElement => {
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

export default {
  title: 'Table/Examples/Pagination Table',
  component: PaginationTable,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    chromatic: { disableSnapshot: false },
  },
} as Meta;
