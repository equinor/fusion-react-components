import { Dropdown } from '@equinor/fusion-react-searchable-dropdown';
import type { ContextSelectorProps } from './types';
import type { ReactElement, PropsWithChildren } from 'react';

export const ContextSelector = ({
  children,
  ...props
}: PropsWithChildren<ContextSelectorProps>): ReactElement => {
  return <Dropdown {...props}>{children}</Dropdown>;
};

export default ContextSelector;
