import SearchableDropdown, {
  DropdownProvider,
  Dropdown,
  useDropdownProviderRef,
  SearchableDropdownProps,
} from '@equinor/fusion-react-searchable-dropdown';
import { _handleAction, _exampleResolver } from './component.helpers';

export default {
  title: 'Examples/Searchable-Dropdown',
  component: SearchableDropdown,
};

export const Component = ({ ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '250px' }}>
      <SearchableDropdown {...props} />
    </div>
  );
};
Component.args = {
  label: 'Example 1',
  placeholder: 'Search here...',
  variant: 'outlined',
  selected: '',
  initialText: 'See results by searching',
  trailingIcon: 'car_wash',
  meta: 'car',
  onAction: _handleAction,
  resolver: _exampleResolver,
};

export const SeperatedComponents = (props: SearchableDropdownProps) => {
  const providerRef = useDropdownProviderRef(_exampleResolver);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '250px' }}>
      <DropdownProvider ref={providerRef}>
        <Dropdown {...props} />
      </DropdownProvider>
    </div>
  );
};
SeperatedComponents.args = {
  label: 'Seperated',
  placeholder: 'Search...',
  initialText: 'Resolver results',
  trailingIcon: 'build_wrench',
  onAction: _handleAction,
};
