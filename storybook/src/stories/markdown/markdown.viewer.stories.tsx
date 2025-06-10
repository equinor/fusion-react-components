import type { Meta, StoryObj } from '@storybook/react-vite';

import { MarkdownViewer } from '@equinor/fusion-react-markdown/src/MarkdownViewer';

import markdown from './demo.md?raw';

const meta: Meta<typeof MarkdownViewer> = {
  title: 'data/Markdown/Viewer',
  component: MarkdownViewer,
};

export default meta;

type Story = StoryObj<typeof MarkdownViewer>;

export const viewer: Story = {
  args: {
    value: markdown,
  },
};
