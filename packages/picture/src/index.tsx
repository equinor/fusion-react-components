import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLPictureCustomElement, { tag } from '@equinor/fusion-wc-picture';

export { HTMLPictureCustomElement };

export const Picture = createComponent(ReactModule, tag, HTMLPictureCustomElement);
export type PictureProps = React.ComponentProps<typeof Picture>;

export default Picture;
