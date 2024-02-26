import type { Meta, StoryObj } from '@storybook/react';

import { MarkdownViewer, MarkdownViewerProps } from '@equinor/fusion-react-markdown/src/MarkdownViewer';

import markdown from './demo.md?raw';

const meta: Meta<MarkdownViewerProps> = {
  title: 'Markdown/Viewer',
  component: MarkdownViewer,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const viewer: Story = {
  args: {
    value: markdown,
  },
};
