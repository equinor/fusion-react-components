import { ThemeProvider as BaseThemeProvider, ThemeProviderProps } from '@material-ui/styles';
import { styles as defaultTheme } from '@equinor/fusion-web-theme';

import Element from '@equinor/fusion-wc-theme';
Element;

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { children, ...args } = props;
  return (
    <BaseThemeProvider {...args} theme={args.theme ?? defaultTheme}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fwc-theme>{children}</fwc-theme>
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
