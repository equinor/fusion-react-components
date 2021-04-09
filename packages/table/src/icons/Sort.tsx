import { FunctionComponent } from 'react';
import SortAlpha from './SortAlpha';
import SortAmount from './SortAmount';
import SortNumeric from './SortNumeric';

import { useStyle } from './icon.style';
import { clsx } from '@equinor/fusion-react-styles';

export type IconType = 'alpha' | 'amount' | 'numeric';
export type IconProps = {
  descending?: boolean;
  type: 'alpha' | 'amount' | 'numeric';
  active?: boolean;
};

export type SortIconProps = React.SVGProps<SVGSVGElement> & { descending?: boolean };

export type SortIconComponent = FunctionComponent<SortIconProps>;

const getComponent = (type: IconType): SortIconComponent => {
  switch (type) {
    case 'alpha':
      return SortAlpha;
    case 'amount':
      return SortAmount;
    case 'numeric':
      return SortNumeric;
  }
};

export const Icon: FunctionComponent<IconProps> = ({ type, active, ...props }: IconProps) => {
  const Component = getComponent(type);
  const classes = useStyle();
  const className = clsx(classes.root, active && classes.active);
  return <Component className={className} {...props} />;
};

export default Icon;
