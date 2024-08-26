/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react';

import { PersonCell } from '@equinor/fusion-react-person/src/PersonCell';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';

import { agGridPersonCell } from '@equinor/fusion-react-ag-grid-person-cell';

import { resolver } from '../person/person-provider';
import { faker } from '@faker-js/faker';

// AgGrid
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import useStyles from '@equinor/fusion-react-ag-grid-styles';

const meta: Meta<typeof PersonCell> = {
  title: 'ag-grid/Person Cell',
  component: PersonCell,
  argTypes: {
    azureId: {
      description: 'Unique person Azure ID',
      table: {
        type: { summary: '(data: T) => string | undefined' }, // Change the type here
      },
    },
    upn: {
      description: 'Unique person email(upn)',
      table: {
        type: { summary: '(data: T) => string | undefined' }, // Change the type here
      },
    },
    dataSource: {
      description: 'Custom person data source',
      table: {
        type: { summary: '(data: T) => PersonInfo | undefined' }, // Change the type here
      },
    },
  },
};

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default meta;

type Story = StoryObj<typeof PersonCell>;

const rowsData = [...Array(5)].map((_, index) => ({
  number: index,
  manufacturer: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  driver: faker.string.uuid(),
  price: faker.string.numeric(6),
}));

const defaultCol = {
  flex: 0.8,
};

export const basic: Story = {
  decorators: [
    (Story) => (
      <Theme>
        <PersonProvider resolve={resolver}>
          <Story />
        </PersonProvider>
      </Theme>
    ),
  ],

  render: () => {
    useStyles();

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
        dataToSort(data) {
          return data;
        },
      }),
      { field: 'price' },
    ] as ColDef[];

    return (
      <div className="ag-theme-alpine-fusion" style={{ height: 320 }}>
        <AgGridReact rowData={rowsData} columnDefs={columnDefs} defaultColDef={defaultCol} tooltipInteraction={true} />
      </div>
    );
  },
};

export const showAvatar: Story = {
  ...basic,

  render: () => {
    useStyles();

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
      <div className="ag-theme-alpine-fusion" style={{ height: 320 }}>
        <AgGridReact rowData={rowsData} columnDefs={columnDefs} defaultColDef={defaultCol} tooltipInteraction={true} />
      </div>
    );
  },
};

export const customHeadings: Story = {
  ...basic,

  render: () => {
    useStyles();

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
      <div className="ag-theme-alpine-fusion" style={{ height: 320 }}>
        <AgGridReact rowData={rowsData} columnDefs={columnDefs} defaultColDef={defaultCol} tooltipInteraction={true} />
      </div>
    );
  },
};

export const customDataObject: Story = {
  ...basic,

  render: () => {
    useStyles();

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
      <div className="ag-theme-alpine-fusion" style={{ height: 320 }}>
        <AgGridReact rowData={rowsData} columnDefs={columnDefs} defaultColDef={defaultCol} tooltipInteraction={true} />
      </div>
    );
  },
};
