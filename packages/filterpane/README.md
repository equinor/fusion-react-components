<!--prettier-ignore-start-->
## `@equinor/fusion-react-filterpane` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-filterpane.svg)](https://www.npmjs.com/package/@equinor/fusion-react-filterpane)

Adds filter functionality through the FilterProvider. 
Also comes with various predefined filters and panels for building out a filterpane. 

Consult the [Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/filterpane-filterpane) for more detailed examples and documentation. 

### Installation

```sh
npm install @equinor/fusion-react-filterpane
```

## Example Usage

```html
<FilterProvider initialData={data} initialFilters={initialFilters}>
  <MyFilterComponent />
  <MyApp />   
  </FilterProvider>
```

### Properties/Attributes

Name                 | Type      | Description
-------------------- | --------- | ------- 
`initialData`        | `Generic*`  | Dataset for filtering. *Recommended type is TData[] or Record<string,TData>
`initialFilters`     | `Record<string,any>`  | Filter selection added at initiation

<!--prettier-ignore-end-->
