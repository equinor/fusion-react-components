import { PropsWithChildren } from 'react';

export const Content = ({ children }: PropsWithChildren<unknown>) => {
  return <div>{children}</div>;
};
