import { Dropdown } from '@equinor/fusion-react-searchable-dropdown';
import type { ContextSelectorProps } from './types';

export const ContextSelector = ({ children, ...props }: React.PropsWithChildren<ContextSelectorProps>): JSX.Element => {
  return <Dropdown {...props}>{children}</Dropdown>;
};

export default ContextSelector;
