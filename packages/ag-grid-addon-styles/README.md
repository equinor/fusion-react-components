# AG Grid

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/table-aggrid--page)

### Install

```tsx 
npm install ag-grid-community
```
```tsx
npm install ag-grid-react
```

## About

AG Grid is a fully-featured and highly customizable JavaScript data grid.

In addition to the standard set of features you'd expect from any grid:

* Column Interactions (resize, reorder, and pin columns)
* Pagination
* Sorting
* Row Selection

Here are some of the features that make AG Grid stand out:

* Custom Filtering
* In-place Cell Editing
* Live Stream Updates
* Customizable Appearance
* Customizable Cell Contents
* State Persistence
* Keyboard Navigation
* Data Export to CSV
* Row Reordering
* Copy / Paste
* Column Spanning
* Pinned Rows
* Full Width Rows

Check out the [developer documentation](https://www.ag-grid.com/react-data-grid/) for a complete list of features or visit [official docs](https://www.ag-grid.com/react-data-grid/grid-features/) for tutorials and feature demos.

To get started in React, check out [the documentation](https://www.ag-grid.com/react-data-grid/getting-started/).

## Simple usage

```tsx
const agTableData = {
  rowData: [
    {
      name: "Kim Parrish",
      address: "4420 Valley Street, Garnerville, NY 10923",
      date: "07/11/2020",
      order: "87349585892118"
    },
    {
      name: "Michele Castillo",
      address: "637 Kyle Street, Fullerton, NE 68638",
      date: "07/11/2020",
      order: "58418278790810"
    },
    {
      name: "Eric Ferris",
      address: "906 Hart Country Lane, Toccoa, GA 30577",
      date: "07/10/2020",
      order: "81534454080477"
    },
    {
      name: "Gloria Noble",
      address: "2403 Edgewood Avenue, Fresno, CA 93721",
      date: "07/09/2020",
      order: "20452221703743"
    },
    {
      name: "Darren Daniels",
      address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
      date: "07/07/2020",
      order: "22906126785176"
    },
    {
      name: "Ted McDonald",
      address: "796 Bryan Avenue, Minneapolis, MN 55406",
      date: "07/07/2020",
      order: "87574505851064"
    }
  ],
  columnDefs: [
    { field: "name" },
    { field: "address" },
    { field: "date" },
    { field: "order" },
  ]
};

<div className="ag-theme-alpine" style={{width: '800px', height: '260px'}}> 
  <AgGridReact 
    rowData={agTableData.rowData}
    columnDefs={agTableData.columnDefs}
  >
  </AgGridReact>
</div>
```
