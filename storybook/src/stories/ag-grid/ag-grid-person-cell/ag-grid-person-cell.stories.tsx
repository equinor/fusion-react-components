import type { Meta, StoryObj } from '@storybook/react-vite';
import { faker } from '@faker-js/faker';

import { PersonCell, PersonProvider } from '@equinor/fusion-react-person';
import { agGridPersonCell } from '@equinor/fusion-react-ag-grid-person-cell';
import { AgGridReact, fusionTheme } from '@equinor/fusion-framework-react-ag-grid';
// AgGrid
import {
  type ColDef,
  ClientSideRowModelModule,
  ModuleRegistry,
  TooltipModule,
} from '@equinor/fusion-framework-react-ag-grid/enterprise';

import { resolver } from '../../person/person-resolver';

const meta: Meta<typeof PersonCell> = {
  title: 'ag-grid/Person Cell',
  component: PersonCell,
  argTypes: {
    azureId: {
      description: 'Unique person Azure ID',
      table: {
        type: { summary: '(data: T) => string | undefined' },
      },
    },
    upn: {
      description: 'Unique person email(upn)',
      table: {
        type: { summary: '(data: T) => string | undefined' },
      },
    },
    dataSource: {
      description: 'Custom person data source',
      table: {
        type: { summary: '(data: T) => PersonInfo | undefined' },
      },
    },
  },
};

ModuleRegistry.registerModules([ClientSideRowModelModule, TooltipModule]);

export default meta;

type Story = StoryObj<typeof PersonCell>;

const rowsData = [...Array(5)].map((_, index) => ({
  number: index,
  manufacturer: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  driver: faker.string.uuid(),
  price: faker.string.numeric(6),
  team: Array.from({ length: 4 }, () => faker.string.uuid()),
}));

const defaultCol = {
  flex: 0.8,
};

export const basic: Story = {
  decorators: [
    (Story) => (
      <PersonProvider resolve={resolver}>
        <Story />
      </PersonProvider>
    ),
  ],

  render: () => {
    const columnDefs = [
      { field: 'number', headerName: '#', maxWidth: 50 },
      { field: 'manufacturer' },
      { field: 'model' },
      agGridPersonCell({
        flex: 1.2,
        field: 'driver',
        azureId: (data: string) => data,
        heading: (person) => person.name,
        subHeading: (person) => person.mail,
        dataToSort(data) {
          return data;
        },
      }),
      { field: 'price' },
      agGridPersonCell({
        flex: 1.4,
        field: 'team',
        azureId: (data: string) => data,
        showAvatar: true,
      }),
    ] as ColDef[];

    return (
      <div style={{ height: 320 }}>
        <AgGridReact
          theme={fusionTheme}
          rowData={rowsData}
          columnDefs={columnDefs}
          defaultColDef={defaultCol}
          tooltipInteraction={true}
        />
      </div>
    );
  },
};

export const showAvatar: Story = {
  ...basic,

  render: () => {
    const columnDefs = [
      { field: 'number', headerName: '#', maxWidth: 50 },
      { field: 'manufacturer' },
      { field: 'model' },
      agGridPersonCell({
        flex: 1.4,
        field: 'driver',
        azureId: (data: string) => data,
        heading: (person) => person.name,
        subHeading: (person) => person.mail,
        showAvatar: true,
      }),
      { field: 'price' },
    ] as ColDef[];

    return (
      <div style={{ height: 320 }}>
        <AgGridReact
          theme={fusionTheme}
          rowData={rowsData}
          columnDefs={columnDefs}
          defaultColDef={defaultCol}
          tooltipInteraction={true}
        />
      </div>
    );
  },
};

export const customHeadings: Story = {
  ...basic,

  render: () => {
    const columnDefs = [
      { field: 'number', headerName: '#', maxWidth: 50 },
      { field: 'manufacturer' },
      { field: 'model' },
      agGridPersonCell({
        flex: 1.4,
        field: 'driver',
        azureId: (data: string) => data,
        heading: (person) => `<b>${person.jobTitle}</b>`,
        subHeading: (person) => `<a href=mailto:${person.mail}>${person.mail}</a>`,
        showAvatar: true,
      }),
      { field: 'price' },
    ] as ColDef[];

    return (
      <div style={{ height: 320 }}>
        <AgGridReact
          theme={fusionTheme}
          rowData={rowsData}
          columnDefs={columnDefs}
          defaultColDef={defaultCol}
          tooltipInteraction={true}
        />
      </div>
    );
  },
};

export const customDataObject: Story = {
  ...basic,

  render: () => {
    type Driver = {
      driverNumber: number;
      personInfo: {
        upn: string;
      };
    };

    const rowsData = [...Array(5)].map((_, index) => ({
      number: index,
      manufacturer: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      driver: {
        driverNumber: faker.string.numeric(2),
        personInfo: {
          upn: faker.internet.email(),
        },
      },
      price: faker.string.numeric(6),
    }));

    const columnDefs = [
      { field: 'number', headerName: '#', maxWidth: 50 },
      { field: 'manufacturer' },
      { field: 'model' },
      agGridPersonCell({
        flex: 1.4,
        field: 'driver',
        upn: (data: Driver) => data.personInfo.upn,
        heading: (person) => person.name,
        subHeading: (person) => person.jobTitle,
        showAvatar: true,
      }),
      { field: 'price' },
    ] as ColDef[];

    return (
      <div style={{ height: 320 }}>
        <AgGridReact
          theme={fusionTheme}
          rowData={rowsData}
          columnDefs={columnDefs}
          defaultColDef={defaultCol}
          tooltipInteraction={true}
        />
      </div>
    );
  },
};

export const arrayData: Story = {
  ...basic,

  render: () => {
    const columnDefs = [
      { field: 'number', headerName: '#', maxWidth: 50 },
      { field: 'manufacturer' },
      { field: 'model' },
      agGridPersonCell({
        headerName: 'Team with images',
        flex: 1.4,
        field: 'team',
        azureId: (data: string) => data,
        showAvatar: true,
      }),
      agGridPersonCell({
        headerName: 'Team with letters',
        flex: 1.4,
        field: 'team',
        azureId: (data: string) => data,
        showAvatar: false,
      }),
    ] as ColDef[];

    return (
      <div style={{ height: 320 }}>
        <AgGridReact
          theme={fusionTheme}
          rowData={rowsData}
          columnDefs={columnDefs}
          defaultColDef={defaultCol}
        />
      </div>
    );
  },
};
