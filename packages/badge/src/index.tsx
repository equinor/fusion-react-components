import { HTMLAttributes, PropsWithChildren } from 'react';
import HTMLBadgeCustomElement, { BadgeElementProps } from '@equinor/fusion-wc-badge';

// preserve code
HTMLBadgeCustomElement;

// reference to real element
export { HTMLBadgeCustomElement };

export type BadgeProps = BadgeElementProps & HTMLAttributes<HTMLBadgeCustomElement>;

export const Badge = (props: PropsWithChildren<BadgeProps>): JSX.Element => {
  const { children, ...attr } = props;
  return <fwc-badge {...attr}>{children}</fwc-badge>;
};

Badge.displayName = '@equinor/fusion-react-badge';

export default Badge;
