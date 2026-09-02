import type { PropsWithChildren, ReactNode } from 'react';
import type { ComponentProps } from '@equinor/fusion-react-utils';

import '@equinor/fusion-wc-page';

export type PageProps = ComponentProps<HTMLDivElement, PropsWithChildren>;

type PageComponent = ((props: PageProps) => ReactNode) & {
  Header: (props: PageProps) => ReactNode;
  Main: (props: PageProps) => ReactNode;
  Footer: (props: PageProps) => ReactNode;
  displayName?: string;
};

/**
 * Wraps the Fusion page web component and exposes compound components for
 * assigning children to the page header, main, and footer slots.
 */
export const Page: PageComponent = ({ children, ...props }: PageProps): ReactNode => {
  /* @ts-expect-error fwc-page is a web component */
  return <fwc-page {...props}>{children}</fwc-page>;
};
Page.displayName = 'Page';

const Header = ({ children, ...props }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its header slot.
  return (
    <div slot="header" {...props}>
      {children}
    </div>
  );
};
Header.displayName = 'Page.Header';

const Main = ({ children, ...props }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its main slot.
  return (
    <div slot="main" style={{ height: '100%' }} {...props}>
      {children}
    </div>
  );
};
Main.displayName = 'Page.Main';

const Footer = ({ children, ...props }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its footer slot.
  return (
    <div slot="footer" {...props}>
      {children}
    </div>
  );
};
Footer.displayName = 'Page.Footer';

// Compound components mirror the slots supported by the underlying web component.
Page.Header = Header;
Page.Main = Main;
Page.Footer = Footer;

export default Page;
