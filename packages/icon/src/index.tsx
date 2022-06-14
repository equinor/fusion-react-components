import { PropsWithChildren } from 'react';
import type { ComponentProps } from 'react';

import { createComponent } from '@equinor/fusion-react-utils';
import { IconElement as HTMLIconCustomElement, iconNames, tag } from '@equinor/fusion-wc-icon';

export { HTMLIconCustomElement, iconNames };

type ElementProps = PropsWithChildren<Partial<Pick<HTMLIconCustomElement, 'icon' | 'type'>>>;

export const Icon = createComponent<HTMLIconCustomElement, ElementProps>(HTMLIconCustomElement, tag);

export type IconProps = ComponentProps<typeof Icon>;

export default Icon;
