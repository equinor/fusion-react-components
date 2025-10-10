import { Children, Fragment, type ReactNode, isValidElement } from 'react';

import { Tab } from '../components/Tab';
import type { TabObject } from './map-children-to-tabs';

/**
 * Validates if the given children are all of type `Tab`.
 *
 * This function checks if the provided `children` are valid React elements and if all of them are of type `Tab`.
 * It also handles the case where the children are wrapped in a React `Fragment`.
 *
 * @param children - The children to validate, which can be a single React node or an array of React nodes.
 * @returns `true` if all children are of type `Tab`, otherwise `false`.
 */
export function validateChildrenAsTabs(children: ReactNode): boolean {
  // Return false if children are null or undefined
  if (children == null) {
    return false;
  }

  // Check if Fragment, then handle children of Fragment this is for testing purposes.
  if (
    children &&
    Children.count(children) === 1 &&
    isValidElement(children) &&
    children.type === Fragment
  ) {
    const fragmentChildren = (children.props as TabObject).children;
    return validateChildrenAsTabs(fragmentChildren);
  }

  // Check if all children are of type
  return Children.toArray(children)
    .filter(isValidElement)
    .map((child) => (child.type === Tab ? 'tab' : 'unknown'))
    .every((type) => type === 'tab');
}
