/* eslint-disable react/no-multi-comp */
import { Dropdown } from '@equinor/fusion-react-searchable-dropdown';
import { ContextSelectorProps } from './types';

export const ContextSelector = ({ children, ...props }: React.PropsWithChildren<ContextSelectorProps>): JSX.Element => {
  return <Dropdown {...props}>{children}</Dropdown>;
};

export default ContextSelector;
