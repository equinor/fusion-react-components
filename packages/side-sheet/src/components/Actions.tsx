import {
  Children,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type RefObject,
  type ReactElement,
} from 'react';

export type ActionsProps = {
  readonly sideSheetRef?: RefObject<HTMLDivElement>;
};

export const Actions = ({ children, sideSheetRef }: PropsWithChildren<ActionsProps>) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<any>, { sideSheetRef });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
};

export default Actions;
