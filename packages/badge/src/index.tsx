import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLBadgeCustomElement, { tag } from '@equinor/fusion-wc-badge';

export { HTMLBadgeCustomElement };

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLBadgeCustomElement, 'size' | 'position' | 'color' | 'value' | 'icon' | 'circular'>>
>;

export const Badge = createComponent<HTMLBadgeCustomElement, ElementProps>(HTMLBadgeCustomElement, tag);
export type BadgeProps = ComponentProps<HTMLBadgeCustomElement, ElementProps>;

export default Badge;
