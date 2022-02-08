import type { PropsWithChildren, ComponentProps } from 'react';
import { createComponent } from '@equinor/fusion-react-utils';

import HTMLLoaderCustomElement, { tag, LoaderElement, LoaderElementProps } from '@equinor/fusion-wc-loader';

export { HTMLLoaderCustomElement, LoaderElement, LoaderElementProps };

type ElementAttributes = Partial<Pick<HTMLLoaderCustomElement, 'text' | 'size'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const Loader = createComponent<HTMLLoaderCustomElement, ElementProps>(HTMLLoaderCustomElement, tag);

export type LoaderProps = ComponentProps<typeof Loader>;

export default Loader;
