import { createComponent } from '@equinor/fusion-react-utils';
import { IconElement as HTMLIconCustomElement, iconNames, tag } from '@equinor/fusion-wc-icon';

export { HTMLIconCustomElement, iconNames };

type ElementProps = React.PropsWithChildren<Partial<Pick<HTMLIconCustomElement, 'icon' | 'type'>>>;

export const Icon = createComponent<HTMLIconCustomElement, ElementProps>(HTMLIconCustomElement, tag);

export type DateRangeProps = React.ComponentProps<typeof Icon>;

export default Icon;
