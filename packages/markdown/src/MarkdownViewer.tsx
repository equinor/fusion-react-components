import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLMarkdownViewerCustomElement, { tag as MarkdownViewerTag } from '@equinor/fusion-wc-markdown/markdown-viewer';

type ElementProps = PropsWithChildren<Partial<Pick<HTMLMarkdownViewerCustomElement, 'value'>>>;

export type MarkdownViewerProps = ComponentProps<HTMLMarkdownViewerCustomElement, ElementProps>;
export const MarkdownViewer = createComponent<HTMLMarkdownViewerCustomElement, ElementProps>(
  HTMLMarkdownViewerCustomElement,
  MarkdownViewerTag,
);

export { HTMLMarkdownViewerCustomElement };

export default MarkdownViewer;
