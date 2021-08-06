import { Column, Table } from '@equinor/fusion-react-table';
import { useMemo } from 'react';
import { useFilterStore } from '../../../packages/filterpane';
import { Person } from './functions';

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

const FilteredDataTable = (): JSX.Element => {
  const { filteredData } = useFilterStore();

  const options = useMemo(
    () => ({
      data: filteredData as Person[],
      columns,
    }),
    [filteredData]
  );

  if (!(filteredData as Person[])?.length) return <></>;

  return <Table options={options} />;
};

export default FilteredDataTable;
