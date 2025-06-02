import React, { type PropsWithChildren } from 'react';

export type ActionsProps = {
  readonly sideSheetRef?: React.RefObject<HTMLDivElement>;
};

export const Actions = ({ children, sideSheetRef }: PropsWithChildren<ActionsProps>) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return React.cloneElement(child as React.ReactElement<any>, { sideSheetRef });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
};

export default Actions;
