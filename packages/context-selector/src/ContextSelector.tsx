/* eslint-disable react/no-multi-comp */
import { Dropdown, DropdownProps } from '@equinor/fusion-react-searchable-dropdown';

export type ContextSelectorProps = DropdownProps;

export const ContextSelector = ({ children, ...props }: React.PropsWithChildren<ContextSelectorProps>): JSX.Element => {
  return <Dropdown {...props}>{children}</Dropdown>;
};

export default ContextSelector;
