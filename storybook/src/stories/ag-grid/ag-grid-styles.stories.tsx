import { Meta } from '@storybook/react';

import { AgGridReact } from '@ag-grid-community/react';

import { useStyles } from '@equinor/fusion-react-ag-grid-styles';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { faker } from '@faker-js/faker';
import { useRef } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const meta: Meta<typeof useStyles> = {
  title: 'ag-grid/styles',
};

export default meta;

faker.seed(0);

export const AlpineFusionTheme = () => {
  useStyles();
  const rowdData = Array.from({ length: 5 }, () => ({
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    date: faker.date.past(),
    order: String(faker.number.int()),
  }));

  const columnDefs = [
    { field: 'name', editable: true },
    { field: 'lastName', editable: true },
    { field: 'date' },
    { field: 'order', editable: true },
  ];
  const gridRef = useRef<AgGridReact | null>(null);

  return (
    <>
      <div className="ag-theme-alpine-fusion" style={{ width: '1080px', height: '500px' }}>
        <AgGridReact ref={gridRef} rowData={rowdData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </>
  );
};
