import { ContextProvider } from './ContextProvider';
import { ContextSelector } from './ContextSelector';
import { ContextProviderProps, ContextSelectorProps } from './types';

export type ContextHeaderProps = ContextProviderProps & ContextSelectorProps;

export const ContextSelectorHeader = ({
  children,
  resolver,
  ...props
}: React.PropsWithChildren<ContextHeaderProps>): JSX.Element => {
  return (
    <ContextProvider resolver={resolver}>
      <ContextSelector {...props}>{children}</ContextSelector>
    </ContextProvider>
  );
};

export default ContextSelectorHeader;
