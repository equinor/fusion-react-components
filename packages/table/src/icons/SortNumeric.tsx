import { SortIconComponent, SortIconProps } from './Sort';
import Asc from './svg/sort-numeric-asc.svg';
import Desc from './svg/sort-numeric-desc.svg';

export const Icon: SortIconComponent = ({ descending, ...props }: SortIconProps) => {
  const Component = descending ? Desc : Asc;
  return <Component {...props} />;
};

export default Icon;
