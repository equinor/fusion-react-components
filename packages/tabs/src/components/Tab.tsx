import type { PropsWithChildren, ReactNode } from 'react';
/**
 * Props for the Tab component.
 *
 * @property title - The title of the tab.
 * @property component - An optional ReactNode to be rendered within the tab.
 */
type TabProps = {
  readonly title: string | ReactNode;
  readonly id: string;
  readonly component?: ReactNode;
  readonly right?: boolean;
};

/**
 * A functional component that renders a specified component.
 * @returns {ReactNode} The specified component to be rendered.
 */
export const Tab = (props: PropsWithChildren<TabProps>): ReactNode => {
  const Component = props.component;
  return Component;
};
