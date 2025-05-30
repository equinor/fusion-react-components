import { ThemeProvider as BaseThemeProvider, type ThemeProviderProps } from '@material-ui/styles';
import { styles as defaultTheme } from '@equinor/fusion-web-theme';

import Element from '@equinor/fusion-wc-theme';
Element;

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { children, ...args } = props;
  return (
    <BaseThemeProvider {...args} theme={args.theme ?? defaultTheme}>
      <fwc-theme>{children}</fwc-theme>
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
