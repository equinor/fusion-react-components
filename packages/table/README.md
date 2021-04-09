# `@equinor/fusion-react-table`

> WIP - more docs comming

## Basic
```tsx
const data = [
  {
    "name": "Kim Parrish",
    "address": "4420 Valley Street, Garnerville, NY 10923",
    "date": "07/11/2020",
    "order": "87349585892118"
  },
  {
    "name": "Michele Castillo",
    "address": "637 Kyle Street, Fullerton, NE 68638",
    "date": "07/11/2020",
    "order": "58418278790810"
  },
  {
    "name": "Eric Ferris",
    "address": "906 Hart Country Lane, Toccoa, GA 30577",
    "date": "07/10/2020",
    "order": "81534454080477"
  },
  {
    "name": "Gloria Noble",
    "address": "2403 Edgewood Avenue, Fresno, CA 93721",
    "date": "07/09/2020",
    "order": "20452221703743"
  },
  {
    "name": "Darren Daniels",
    "address": "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
    "date": "07/07/2020",
    "order": "22906126785176"
  },
  {
    "name": "Ted McDonald",
    "address": "796 Bryan Avenue, Minneapolis, MN 55406",
    "date": "07/07/2020",
    "order": "87574505851064"
  }
];

const columns: Array<FusionColumn<DataType>> = [
  {
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Order #',
        accessor: 'order',
      },
  },
];

<FusionTable data={data} columns={columns} sort />
```
## Grouped headers

```tsx
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
```

## Column Menu
```tsx
type ColumnMenuOptions<D extends TableData> = {
  readonly showMenu?: boolean;
  readonly menuItems?: FunctionComponent<HeaderProps<D>>[];
  MenuIcon?: (instance: ColumnInstance<D>) => ReactNode;
};

// example
import {ColumnMenuItems} from '@equinor/fusion-react-table';

const columns: Array<FusionColumn<DataType>> = [
  {
      {
        Header: 'Name',
        accessor: 'name',
        // only display sort and custom menu button
        menuItems: [
          ColumnMenuItems.ColumnMenuItemSort,
          ({column}) => column.canResize && <span>canResize</span>
        ],
        // custom menu icon
        MenuIcon: () => <span>🤖</span>,
      },
      {
        Header: 'Address',
        accessor: 'address',
        // do not show menu
        showMenu: false,
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Order #',
        accessor: 'order',
      },
  },
];
```

### Context
```tsx
type ColumnMenuContext<D extends TableData = TableData> = {
  header?: HeaderProps<D>;
  open?: boolean;
  show: VoidFunction;
  close: VoidFunction;
};
```
