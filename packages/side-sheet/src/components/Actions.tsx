import React, { PropsWithChildren } from 'react';

export type ActionsProps = {
  sideSheetRef?: React.RefObject<HTMLDivElement>;
};

export const Actions = ({ children, sideSheetRef }: PropsWithChildren<ActionsProps>) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { sideSheetRef });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
};
