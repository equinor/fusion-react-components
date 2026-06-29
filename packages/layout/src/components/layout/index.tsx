import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import { LayoutElement } from '@equinor/fusion-wc-layout';

// makes sure web component is registrerred
LayoutElement;

export const Layout = ({ children }: PropsWithChildren): ReactNode => {
  const [hasSidebar, setHasSidebar] = useState<boolean>(true);

  const childArray = Children.toArray(children);

  const hasSidebarChild = childArray.some((child) => {
    return isValidElement(child) && child.type === Layout.Sidebar;
  });

  useEffect(() => {
    setHasSidebar(hasSidebarChild);
  }, [hasSidebarChild]);

  /* @ts-expect-error the jsx element exist */
  return <fwc-layout sidebar={hasSidebar}>{children}</fwc-layout>;
};

Layout.displayName = 'Layout';

Layout.Sidebar = ({ children }: PropsWithChildren): ReactNode => {
  return <div slot="sidebar">{children}</div>;
};

Layout.Content = ({ children }: PropsWithChildren): ReactNode => {
  return <div slot="content">{children}</div>;
};

export default Layout;
