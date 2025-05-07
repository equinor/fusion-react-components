import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { MarkdownViewerElement, markdownViewerTag } from '@equinor/fusion-wc-markdown';

type ElementProps = PropsWithChildren<Partial<Pick<MarkdownViewerElement, 'value'>>>;

export type MarkdownViewerProps = ComponentProps<MarkdownViewerElement, ElementProps>;
export const MarkdownViewer = createComponent<MarkdownViewerElement, ElementProps>(
  MarkdownViewerElement,
  markdownViewerTag,
);

export { MarkdownViewerElement as HTMLMarkdownViewerCustomElement };

export default MarkdownViewer;
