import { Column, Table, Toolbar } from '@equinor/fusion-react-table';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useMemo } from 'react';
import Button from '@equinor/fusion-react-button';

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
type Props = {
  rows: number;
  justifyContent: 'flex-start' | 'center' | 'flex-end';
  toolbarChildren?: JSX.Element;
};
const Template: Story<Props> = (args) => {
  const options = useMemo(
    () => ({
      data: makeData(args.rows),
      columns,
    }),
    [args.rows]
  );

  return (
    <Table
      options={options}
      slots={{ Toolbar: <Toolbar children={args.toolbarChildren} justify={args.justifyContent} /> }}
    ></Table>
  );
};

const ToolbarChildren = () => {
  return (
    <div style={{ display: 'flex', gap: '1em' }}>
      <Button>Select</Button>
      <Button>Example</Button>
    </div>
  );
};

export const DefaultTable = Template.bind({});
DefaultTable.args = {
  rows: 10,
};

export const CustomTableToolbar = Template.bind({});
CustomTableToolbar.args = {
  rows: 10,
  justifyContent: 'flex-end',
  toolbarChildren: <ToolbarChildren />,
};
