import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLMarkdownEditorCustomElement, { tag as MarkdownEditorTag } from '@equinor/fusion-wc-markdown/markdown-editor';
import { MenuSizes } from '@equinor/fusion-wc-markdown';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLMarkdownEditorCustomElement, 'menuItems' | 'minHeight' | 'value' | 'menuSize'>>
>;

export type MarkdownEditorProps = ComponentProps<HTMLMarkdownEditorCustomElement, ElementProps>;
export const MarkdownEditor = createComponent<HTMLMarkdownEditorCustomElement, ElementProps>(
  HTMLMarkdownEditorCustomElement,
  MarkdownEditorTag,
  { events: { onInput: 'markdownEvent' } }
);

export { HTMLMarkdownEditorCustomElement, MenuSizes };

export default MarkdownEditor;
