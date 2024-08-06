<!--prettier-ignore-start-->
# @equinor/fusion-react-ag-grid-person-cell

## About

React component for displaying person details in AgGrid cell and PersonCard on cell hover

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-ag-grid-person-cell.svg)](https://www.npmjs.com/package/@equinor/fusion-react-ag-grid-person-cell)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/person-aggrid-cell-docs--docs)

### Installation

```sh
npm install @equinor/fusion-react-ag-grid-person-cell
```

### How to use

When you have prepared the data that will populate your AgGrid, use the `agGridPersonCell` function to define a column that will render the component.
To correctly map your data, pass in the relevant properties, such as `azureId`, `upn`, or `dataSource`. Additionally, you can change the cell's display by passing in optional props like `heading`, `subHeading`, `size`, and `showAvatar` to customize the appearance and content of the cell.

#### Code example

```tsx
const columnDefs = useMemo<ColDef[]>(() => {
  return [
    ...agGridColumns,
    agGridPersonCell({
      ...agCellData,
      field: 'fieldName', // The field name that holds person data
      azureId: (data) => data, // Function to extract Azure ID from data
      heading: (person) => person.name, // Function to extract person's name as heading
      subHeading: (person) => person.mail, // Function to extract person's email as sub heading
      size: 'small', // Specifies the size of the component
      showAvatar: true, // Determines whether to show the avatar in the cell
    })
  ];
}, []);
```

#### Customizing heading and subHeading with HTML

You can customize the content of the `heading` and `subHeading` in the component by passing functions that return HTML strings. This allows you to format the text or include additional elements like links.

For example, you might want to display the **job title** in bold and the **email** as a **clickable link**.

```tsx
    agGridPersonCell({
      ...agPersonCellData,
      heading: (person) => `<b>${person.jobTitle}</b>`,  // Custom HTML for heading
      subHeading: (person) => `<a href="mailto:${person.mail}">${person.mail}</a>`, // Custom HTML for subHeading
    })
```

<!--prettier-ignore-end-->
