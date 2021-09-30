import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLBadgeCustomElement, { tag } from '@equinor/fusion-wc-badge';

export { HTMLBadgeCustomElement };

export const Badge = createComponent(ReactModule, tag, HTMLBadgeCustomElement);
export type BadgeProps = React.ComponentProps<typeof Badge>;

export default Badge;
