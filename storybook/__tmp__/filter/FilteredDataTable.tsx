import { useMemo } from 'react';

import { Column, Table, TableData, TableOptions } from '@equinor/fusion-react-table';
import { useFilterStore } from '@equinor/fusion-react-filter';

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
    Header: 'Status',
    accessor: 'status',
  },
];

const FilteredDataTable = (): JSX.Element => {
  const { filteredData } = useFilterStore();

  const options: TableOptions<TableData, TableData> = useMemo(
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
