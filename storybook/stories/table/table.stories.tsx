import { FusionColumn, FusionTable, FusionTableProps } from '@equinor/fusion-react-table';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Table/Stories',
  component: FusionTable,
} as Meta;

import data from './data.json';

type DataType = {
  name: string | undefined;
  address: string | undefined;
  date: string | undefined;
  order: string | undefined;
};

const columns: Array<FusionColumn<DataType>> = [
  {
    Header: 'Name',
    accessor: 'name',
    dataType: 'text',
  },
  {
    Header: 'Address',
    accessor: 'address',
    showMenu: false,
  },
  {
    Header: 'Date',
    accessor: 'date',
    dataType: 'datetime',
  },
  {
    Header: 'Order #',
    accessor: 'order',
    dataType: 'number',
  },
];

const groupedColumns: Array<FusionColumn<DataType>> = [
  {
    Header: 'User Info',
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
    ],
  },
  {
    Header: 'Order Info',
    columns: [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Order #',
        accessor: 'order',
        showMenu: false,
      },
    ],
  },
];

const Template: Story<FusionTableProps<DataType>> = (args) => <FusionTable {...args} style={{ width: '100%' }} />;

export const SortableTable = Template.bind({});
SortableTable.args = {
  data: data,
  columns: columns,
  sort: true,
  // sortTypes: {
  //   test: (...args) => console.log(args),
  // },
};

export const GroupedSortableTable = Template.bind({});
GroupedSortableTable.args = { data: data, columns: groupedColumns, sort: true };
