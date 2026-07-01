import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import '@equinor/fusion-wc-layout';

type LayoutComponent = ((props: PropsWithChildren) => ReactNode) & {
  Sidebar: (props: PropsWithChildren) => ReactNode;
  Content: (props: PropsWithChildren) => ReactNode;
  displayName?: string;
};

/**
 * Wraps the Fusion layout web component and exposes compound components for
 * assigning children to the layout content and sidebar slots.
 */
export const Layout: LayoutComponent = ({ children }: PropsWithChildren): ReactNode => {
  const [hasSidebar, setHasSidebar] = useState<boolean>(true);

  const childArray = Children.toArray(children);

  // Keep the web component sidebar state aligned with the compound component tree.
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

// Compound components mirror the slots supported by the underlying web component.
Layout.Sidebar = ({ children }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its sidebar slot.
  return <div slot="sidebar">{children}</div>;
};

Layout.Content = ({ children }: PropsWithChildren): ReactNode => {
  // The underlying web component projects this content into its main content slot.
  return <div slot="content">{children}</div>;
};

export default Layout;
