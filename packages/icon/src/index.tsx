import { PropsWithChildren } from 'react';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLIconCustomElement, { tag, iconNames } from '@equinor/fusion-wc-icon';

type ElementProps = PropsWithChildren<Partial<Pick<HTMLIconCustomElement, 'icon' | 'type'>>>;

export const Icon = createComponent<HTMLIconCustomElement, ElementProps>(HTMLIconCustomElement, tag);

export type IconProps = ComponentProps<HTMLIconCustomElement, ElementProps>;

export { HTMLIconCustomElement, iconNames };

export default Icon;
