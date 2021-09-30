import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import { iconNames, IconElement as HTMLIconCustomElement, tag } from '@equinor/fusion-wc-icon';

export { iconNames, HTMLIconCustomElement };

export const Icon = createComponent(ReactModule, tag, HTMLIconCustomElement);
export type IconProps = React.ComponentProps<typeof Icon>;

export default Icon;
