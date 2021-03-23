[![npm version](https://badge.fury.io/js/%40equinor%2Ffusion-react-styles.svg)](https://www.npmjs.com/package/@equinor/fusion-react-styles)

# @equinor/fusion-react-styles

## Install
```
npm install @equinor/fusion-react-styles
```

## Basic
```tsx
import { makeStyles, createStyles, clsx, theme, FusionTheme } from '@equinor/fusion-react-styles';

type StyleProps = {
  color: string;
  background: keyof typeof theme.colors.ui;
};

const defaultStyleProps: StyleProps = {
  background: 'background__default', 
  color: 'white'
}

const useStyles = makeStyles<FusionTheme, StyleProps>((theme) =>
  createStyles({
    // style rule
    foo: ({ background }) => ({
      // theme style
      ...theme.typography.paragraph.ingress.style,
      // theme value
      backgroundColor: theme.colors.ui[background].value.hex,
    }),
    bar: {
      // CSS property
      color: (props) => props.color,
    },
  })
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

## 🏗 Comming

* __FusionThemeProvider__ - Component for providing theme context to theme consumers (_makeStyles_)
