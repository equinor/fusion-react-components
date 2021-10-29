import { createComponent } from '@equinor/fusion-react-utils';
import HTMLBadgeCustomElement, { tag } from '@equinor/fusion-wc-badge';

export { HTMLBadgeCustomElement };

export type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLBadgeCustomElement, 'size' | 'position' | 'color' | 'value' | 'icon' | 'circular' | 'tooltip'>>
>;

export const Badge = createComponent<HTMLBadgeCustomElement, ElementProps>(HTMLBadgeCustomElement, tag);
export type BadgeProps = React.ComponentProps<typeof Badge>;

export default Badge;
