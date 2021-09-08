# @equinor/fusion-react-styles

[![npm version](https://badge.fury.io/js/%40equinor%2Ffusion-react-styles.svg)](https://www.npmjs.com/package/@equinor/fusion-react-styles)

## Install
```
npm install @equinor/fusion-react-styles
```

## Basic
```tsx
import { makeStyles, createStyles, clsx, theme } from '@equinor/fusion-react-styles';

type StyleProps = {
  color: string;
  background: keyof typeof theme.colors.ui;
};

const defaultStyleProps: StyleProps = {
  background: 'background__default', 
  color: 'white'
}

const useStyles = makeStyles((theme) =>
  createStyles({
    // style rule
    foo: ({ background }: StyleProps) => ({
      // theme style
      ...theme.typography.paragraph.ingress.style,
      // theme value
      backgroundColor: theme.colors.ui[background].getAttribute('color'),
    }),
    bar: {
      // CSS property
      color: (props: StyleProps) => props.color,
    },
  }),
  // name the stylesheet for easy debugging
  { name: 'my-component' }
);



const MyComponent = (props: StyleProps) => {
  // Pass the props as the first argument of useStyles()
  const classes = useStyles({ ...defaultStyleProps, ...props });
  // Combine classes
  const className = clsx(classes.foo, classes.bar);
  
  return <div className={className} />;
};

const App = () => {
  return (
    <div>
      <MyComponent color="red" background="background__danger"/>
      <MyComponent color="blue"/>
    </div>
  );
};
```

### Specificity

In some cases one need higher specificity to override class from imported component.
This is achieved by increasing the specificity.

```tsx
const styles = makeStyles(createStyles({
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
}));

const MyComponent = (props: StyleProps) => {
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();
  const className = clsx(classes.root, disabled && classes.disabled);
  return <div className={className} />;
};

```

## Provider
> 🏗 WIP - there will be better way to provide custom theme object

**When developing for Fusion, this is not necessary, since provider is injected into the portal framework**

```tsx
import {ThemeProvider} from '@equinor/fusion-react-styles';
const mount = (
  <ThemeProvider seed="my-app">
    <MyApp />
  </ThemeProvider>
);
ReactDOM.render(mount, document.getElementById('root'));
```