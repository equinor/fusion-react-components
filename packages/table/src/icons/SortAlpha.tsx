import { SortIconComponent, SortIconProps } from './Sort';

import Asc from './svg/sort-alpha-asc.svg';
import Desc from './svg/sort-alpha-desc.svg';

export const Icon: SortIconComponent = ({ descending, ...props }: SortIconProps) => {
  const Component = descending ? Desc : Asc;
  return <Component {...props} />;
};

export default Icon;
