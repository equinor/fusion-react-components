import type { PropsWithChildren, ReactNode } from 'react';

import { PageElement } from '@equinor/fusion-wc-page';

// makes sure web component is registrerred in browser
PageElement;

export const Page = ({ children }: PropsWithChildren): ReactNode => {
  /* @ts-expect-error the jsx element exist */
  return <fwc-page>{children}</fwc-page>;
};
Page.displayName = 'Page';

const Header = ({ children }: PropsWithChildren): ReactNode => {
  return <div slot="header">{children}</div>;
};
Header.displayName = 'Page.Header';

const Main = ({ children }: PropsWithChildren): ReactNode => {
  return <div slot="main">{children}</div>;
};
Main.displayName = 'Page.Main';

const Footer = ({ children }: PropsWithChildren): ReactNode => {
  return <div slot="footer">{children}</div>;
};
Footer.displayName = 'Page.Footer';

Page.Header = Header;
Page.Main = Main;
Page.Footer = Footer;

export default Page;
