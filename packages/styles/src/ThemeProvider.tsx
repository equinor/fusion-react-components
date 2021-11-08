import { ThemeProvider as BaseThemeProvider, ThemeProviderProps } from '@material-ui/styles';

import Element from '@equinor/fusion-wc-theme';
Element;

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { children, ...args } = props;
  return (
    <BaseThemeProvider {...args}>
      <fwc-theme>{children}</fwc-theme>
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
