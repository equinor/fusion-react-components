import type { PropsWithChildren, ReactNode } from 'react';

import { PageElement } from '@equinor/fusion-wc-page';

// Referencing the element module registers the custom element before React renders it.
PageElement;

/**
 * Wraps the Fusion page web component and exposes compound components for
 * assigning children to the page header, main, and footer slots.
 */
export const Page = ({ children }: PropsWithChildren): ReactNode => {
  /* @ts-expect-error the jsx element exist */
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
