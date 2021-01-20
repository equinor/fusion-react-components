import { FusionColumn, FusionTable } from '@equinor/fusion-react-table';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Table/Stories',
  component: FusionTable,
} as Meta;

import data from './data.json';

type DataType = {
  name: string;
};

const columns: Array<FusionColumn<DataType>> = [
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
      },
    ],
  },
];

const Template: Story<Text> = (args) => <FusionTable data={data} columns={columns} sort />;

export const SortableTable = Template.bind({});
