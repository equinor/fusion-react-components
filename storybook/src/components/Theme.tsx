import { ThemeProvider, theme } from '@equinor/fusion-react-styles';

export const Theme = ({ children }: React.PropsWithChildren<Record<string, any>>) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
