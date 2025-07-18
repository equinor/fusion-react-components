import { Children, Fragment, type ReactNode, isValidElement } from 'react';
import { Tab } from '../components/Tab';

/**
 * Represents a tab object used in the application.
 *
 * @typedef {Object} TabObject
 * @property {string} title - The title of the tab.
 * @property {string} id - The id of the tab.
 * @property {ReactNode} [component] - An optional component to be rendered within the tab.
 * @property {React.ReactNode} children - The content to be displayed within the tab.
 */
export type TabObject = {
  id: string;
  title: string;
  component?: ReactNode;
  children: React.ReactNode;
  right: boolean;
};

type TabMap = {
  left: TabObject[];
  right: TabObject[];
};

/**
 * Maps React children elements to an array of tab objects. This is used to extract tabs and
 * sort them into left and right side tabs.
 *
 * This function processes the given React children and extracts tab information
 * from elements of type `Tabs`. If a child is a `Fragment`, it recursively processes
 * its children. The resulting array contains objects with the tab's title, component,
 * and children.
 *
 * @param children - The React children elements to process.
 * @returns An object containing two arrays of tab objects, one for the left side and one for the right side.
 */
export function mapChildrenToTabs(children: React.ReactNode): TabMap {
  const left = [] as TabObject[];
  const right = [] as TabObject[];

  const processChild = (child: ReactNode) => {
    if (!isValidElement(child)) return;

    if (child.type === Fragment) {
      Children.forEach(child.props.children, processChild);
    } else if (child.type === Tab) {
      const item: TabObject = {
        id: child.props.id,
        title: child.props.title,
        component: child.props.component,
        children: child.props.children,
        right: child.props.right || false,
      };

      child.props.right ? right.push(item) : left.push(item);
    }
  };

  Children.forEach(children, processChild);

  return { left, right };
}
