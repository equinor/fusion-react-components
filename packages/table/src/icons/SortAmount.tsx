import { SortIconComponent, SortIconProps } from './Sort';
import Asc from './svg/sort-amount-asc.svg';
import Desc from './svg/sort-amount-desc.svg';

export const Icon: SortIconComponent = ({ descending, ...props }: SortIconProps) => {
  const Component = descending ? Desc : Asc;
  return <Component {...props} />;
};

export default Icon;
