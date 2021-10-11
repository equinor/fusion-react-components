import { Column, Table, Toolbar } from '@equinor/fusion-react-table';
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
type StoryProps = { rows: number };
export const ToolbarTable = ({ rows }: StoryProps) => {
  const options = useMemo(
    () => ({
      data: makeData(rows),
      columns,
      exportFn: async (_: any) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return { url: 'https://vg.no', fileName: 'storybook' };
      },
    }),
    [rows]
  );

  return <Table options={options} slots={{ Toolbar: <Toolbar /> }}></Table>;
};

export default {
  title: 'Table/Examples/Toolbar Table',
  component: ToolbarTable,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};
