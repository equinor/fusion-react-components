import { Column, Table, Toolbar } from '@equinor/fusion-react-table';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useMemo } from 'react';
import Button from '@equinor/fusion-react-button';
import makeData from './makeData';

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
    dataType: 'text',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    dataType: 'text',
  },
  {
    Header: 'Age',
    accessor: 'age',
    dataType: 'number',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    dataType: 'number',
  },
  {
    Header: 'Status',
    accessor: 'status',
    dataType: 'text',
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
    dataType: 'number',
  },
];
const ToolbarChildren = () => {
  return (
    <div style={{ display: 'flex', gap: '1em' }}>
      <Button>Select</Button>
      <Button>Example</Button>
    </div>
  );
};
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
      exportFn: async (data: any) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return { url: 'https://vg.no', fileName: 'storybook' };
      },
    }),
    [args.rows]
  );

  return (
    <Table
      options={options}
      slots={{
        Toolbar: <Toolbar children={args.toolbarChildren} justify={args.justifyContent} hideExportBtn={false} />,
      }}
    ></Table>
  );
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  rows: 10,
};

export const CustomTableToolbar = Template.bind({});
CustomTableToolbar.args = {
  rows: 10,
  justifyContent: 'flex-end',
  toolbarChildren: <ToolbarChildren />,
};
