import type { PropsWithChildren, ReactNode } from 'react';

import '@equinor/fusion-wc-page';

type PageComponent = ((props: PropsWithChildren) => ReactNode) & {
  Header: (props: PropsWithChildren) => ReactNode;
  Main: (props: PropsWithChildren) => ReactNode;
  Footer: (props: PropsWithChildren) => ReactNode;
  displayName?: string;
};

/**
 * Wraps the Fusion page web component and exposes compound components for
 * assigning children to the page header, main, and footer slots.
 */
export const Page: PageComponent = ({ children }: PropsWithChildren): ReactNode => {
  /* @ts-expect-error fwc-page is a web component */
  return <fwc-page>{children}</fwc-page>;
};
Page.displayName = 'Page';

const Header = ({ children }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its header slot.
  return <div slot="header">{children}</div>;
};
Header.displayName = 'Page.Header';

const Main = ({ children }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its main slot.
  return <div slot="main">{children}</div>;
};
Main.displayName = 'Page.Main';

const Footer = ({ children }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its footer slot.
  return <div slot="footer">{children}</div>;
};
Footer.displayName = 'Page.Footer';

// Compound components mirror the slots supported by the underlying web component.
Page.Header = Header;
Page.Main = Main;
Page.Footer = Footer;

export default Page;
