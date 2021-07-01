import { FunctionComponent } from 'react';
import '@equinor/fusion-wc-theme';

export const ThemeProvider: FunctionComponent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <fwc-theme></fwc-theme>
      {children}
    </>
  );
};
