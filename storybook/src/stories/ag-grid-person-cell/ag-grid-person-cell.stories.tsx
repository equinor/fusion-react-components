/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { PersonTableCell } from '@equinor/fusion-react-person/src/PersonTableCell';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';

import { agGridPersonCell } from '@equinor/fusion-react-ag-grid-person-cell/src/agPersonCell';

import { resolver } from '../person/person-provider';
import { faker } from '@faker-js/faker';

// AgGrid
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import useStyles from '@equinor/fusion-react-ag-grid-styles';

const meta: Meta<typeof PersonTableCell> = {
  title: 'person/AgGrid Cell',
  component: PersonTableCell,
};

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default meta;

type Story = StoryObj<typeof PersonTableCell>;

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

    const columnDefs = useMemo<ColDef[]>(() => {
      return [
        { field: 'number', headerName: '#', maxWidth: 50 },
        { field: 'manufacturer' },
        { field: 'model' },
        agGridPersonCell({
          flex: 1.4,
          field: 'driver',
          azureId: (data) => data,
          heading: (person) => person.name,
          subHeading: (person) => person.mail,
          dataToSort(data) {
            return data;
          },
        }),
        { field: 'price' },
      ];
    }, []);

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

    const columnDefs = useMemo<ColDef[]>(() => {
      return [
        { field: 'number', headerName: '#', maxWidth: 50 },
        { field: 'manufacturer' },
        { field: 'model' },
        agGridPersonCell({
          flex: 1.4,
          field: 'driver',
          azureId: (data) => data,
          heading: (person) => person.name,
          subHeading: (person) => person.mail,
          showAvatar: true,
        }),
        { field: 'price' },
      ];
    }, []);

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

    const columnDefs = useMemo<ColDef[]>(() => {
      return [
        { field: 'number', headerName: '#', maxWidth: 50 },
        { field: 'manufacturer' },
        { field: 'model' },
        agGridPersonCell({
          flex: 1.4,
          field: 'driver',
          azureId: (data) => data,
          heading: (person) => `<b>${person.jobTitle}</b>`,
          subHeading: (person) => `<a href=mailto:${person.mail}>${person.mail}</a>`,
          showAvatar: true,
        }),
        { field: 'price' },
      ];
    }, []);

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

    const columnDefs = useMemo<ColDef[]>(() => {
      return [
        { field: 'number', headerName: '#', maxWidth: 50 },
        { field: 'manufacturer' },
        { field: 'model' },
        agGridPersonCell({
          flex: 1.4,
          field: 'driver',
          upn: (data) => data.personInfo.upn,
          heading: (person) => person.name,
          subHeading: (person) => person.jobTitle,
          showAvatar: true,
        }),
        { field: 'price' },
      ];
    }, []);

    return (
      <div className="ag-theme-alpine-fusion" style={{ height: 320 }}>
        <AgGridReact rowData={rowsData} columnDefs={columnDefs} defaultColDef={defaultCol} tooltipInteraction={true} />
      </div>
    );
  },
};
