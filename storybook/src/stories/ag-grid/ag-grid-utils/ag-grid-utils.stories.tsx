import type { Meta } from '@storybook/react-vite';

import {
  createStatusField,
  defaultValueSetter,
  defaultValueGetter,
  addInitialProps,
  AGGridDataStatus,
} from '@equinor/fusion-react-ag-grid-utils';

import { AgGridReact, fusionTheme } from '@equinor/fusion-framework-react-ag-grid';

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  TextEditorModule,
  ClientSideRowModelApiModule,
} from '@equinor/fusion-framework-react-ag-grid/enterprise';

import { faker } from '@faker-js/faker';
import { useRef } from 'react';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextEditorModule,
  ClientSideRowModelApiModule,
]);

const meta: Meta<typeof AGGridDataStatus> = {
  tags: ['autodocs'],
  title: 'ag-grid/Ag-Grid Utils',
};

export default meta;

faker.seed(0);

export const ChangeHandler = () => {
  const rowdData = Array.from({ length: 10 }, () =>
    addInitialProps({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      date: faker.date.past(),
      order: String(faker.number.int()),
    }),
  );

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
        type="button"
        onClick={() =>
          gridRef.current?.api.applyTransaction({
            add: [addInitialProps({}, AGGridDataStatus.NEW)],
          })
        }
      >
        Add row
      </button>
      <div style={{ width: '1080px', height: '500px' }}>
        <AgGridReact
          theme={fusionTheme}
          ref={gridRef}
          rowData={rowdData}
          columnDefs={columnDefs}
          defaultColDef={{
            valueSetter: defaultValueSetter,
            valueGetter: defaultValueGetter,
          }}
        />
      </div>
    </>
  );
};
