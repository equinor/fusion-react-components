# AG Grid Styles

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/table-ag-grid-styles--page)

### Install

```tsx
npm install @equinor/fusion-react-ag-grid-styles
```

## About

The hook adds the theme `alpine-fusion` to your ag-grid instance without adding global stylesheet to the portal.
It sets up the required variables and classnames for use in your component in a scoped naming scheme.

You do not need any other styles from the ag-grid package or other fusion packages.

## Usage

- And set the theme name to `ag-theme-alpine-fusion`

```tsx
import AgGridReact from '@ag-grid-community/core';
import useStyles from '@equinor/fusion-react-ag-grid-styles';

const MyComponent = (): JSX.Element => {
  const styles = useStyles();

  return (
    <div className="ag-theme-alpine-fusion">
      <AgGridReact {...props} />
    </div>
  );
};
```
