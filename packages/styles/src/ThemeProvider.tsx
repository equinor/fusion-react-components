import { createGenerateClassName, StylesProvider, StylesProviderProps } from '@material-ui/styles';

import Element from '@equinor/fusion-wc-theme';
Element;

type ThemeProviderProps = StylesProviderProps & {
  seed?: string;
};

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { children, seed, ...args } = props;
  if (seed && !args.generateClassName) {
    args.generateClassName = createGenerateClassName({ seed });
  }
  return (
    <StylesProvider {...args}>
      <fwc-theme>{children}</fwc-theme>
    </StylesProvider>
  );
};
