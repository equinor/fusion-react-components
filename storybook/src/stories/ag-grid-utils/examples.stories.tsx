import {
  createStatusField,
  defaultValueSetter,
  defaultValueGetter,
  addInitialProps,
  AGGridDataStatus,
} from '@equinor/fusion-react-ag-grid-utils';

import { AgGridReact } from '@ag-grid-community/react';

import useAgGridStyles from '@equinor/fusion-react-ag-grid-styles';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { faker } from '@faker-js/faker';
import { useRef } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default {
  title: 'Examples/ag-grid/utils',
};

faker.seed(0);

export const ChangeHandler = () => {
  useAgGridStyles();
  const rowdData = Array.from({ length: 10 }, () =>
    addInitialProps({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      date: faker.date.past(),
      order: String(faker.number.int()),
    }),
  );

  console.log(rowdData);

  const columnDefs = [
    { ...createStatusField() },
    { field: 'name', editable: true },
    { field: 'lastName', editable: true },
    { field: 'date' },
    { field: 'order', editable: true },
  ];
  const gridRef = useRef<AgGridReact | null>(null);

  return (
    <>
      <button
        onClick={() => gridRef.current?.api.applyTransaction({ add: [addInitialProps({}, AGGridDataStatus.NEW)] })}
      >
        Add row
      </button>
      <div className="ag-theme-alpine" style={{ width: '1080px', height: '500px' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowdData}
          columnDefs={columnDefs}
          defaultColDef={{
            valueSetter: defaultValueSetter,
            valueGetter: defaultValueGetter,
          }}
        ></AgGridReact>
      </div>
    </>
  );
};
