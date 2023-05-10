import { MarkdownViewer, MarkdownViewerProps } from '@equinor/fusion-react-markdown/src';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Examples/Markdown/Viewer',
  component: MarkdownViewer,
  parameters: {
      chromatic: {
          disableSnapshot: false,
      },
  },
  argTypes: {
    value: {
      description: 'Markdown content',
      control: 'text',
      table: {
        type: { summary: 'Markdown' },
      },
    },
  },
} as Meta;

export const Component: Story<MarkdownViewerProps> = (props: MarkdownViewerProps) => {
  const MarkdownViewer = (props: MarkdownViewerProps) => (
    <fwc-markdown-viewer {...props} />
  )
  return <MarkdownViewer {...props} />
};
Component.args = {
    value: '**some** markdown _text_',
};

export const InitialMarkdown: Story<MarkdownViewerProps> = (props: MarkdownViewerProps) => {
  const initialMarkdown = `# This is markdown \n ## This is also markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`;
  return <MarkdownViewer {...props}>{initialMarkdown}</MarkdownViewer>;
};
