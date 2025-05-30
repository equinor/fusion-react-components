import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import {
  MarkdownEditorElement,
  markdownEditorTag,
  type MenuSizes,
} from '@equinor/fusion-wc-markdown';

type ElementProps = PropsWithChildren<
  Partial<Pick<MarkdownEditorElement, 'menuItems' | 'minHeight' | 'value' | 'menuSize'>>
>;

export type MarkdownEditorProps = ComponentProps<MarkdownEditorElement, ElementProps>;
export const MarkdownEditor = createComponent<MarkdownEditorElement, ElementProps>(
  MarkdownEditorElement,
  markdownEditorTag,
  { events: { onInput: 'markdownEvent' } },
);

export { MarkdownEditorElement as HTMLMarkdownEditorCustomElement, type MenuSizes };

export default MarkdownEditor;
