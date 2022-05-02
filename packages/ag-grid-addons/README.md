# `@equinor/fusion-react-ag-grid-addons`

> WIP - more docs comming

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
