import {
  SearchableDropdown,
  DropdownProvider,
  useDropdownProviderRef,
  DropdownProps,
} from '@equinor/fusion-react-searchable-dropdown';
import { _handleSelect, _exampleResolver } from './component.helpers';

export default {
  title: 'Examples/Searchable-Dropdown',
  component: SearchableDropdown,
};

export const SearchableIcons = (props: DropdownProps) => {
  const providerRef = useDropdownProviderRef(_exampleResolver);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '250px' }}>
      <DropdownProvider ref={providerRef}>
        <SearchableDropdown {...props} />
      </DropdownProvider>
    </div>
  );
};
SearchableIcons.args = {
  label: 'Icons',
  placeholder: 'Search here...',
  variant: 'outlined',
  selected: '',
  initialText: 'See results by searching',
  trailingIcon: 'car_wash',
  meta: 'car',
  onSelect: _handleSelect,
  resolver: _exampleResolver,
};
