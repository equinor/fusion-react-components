import type { Meta, StoryObj } from '@storybook/react-vite';

import { MarkdownEditor } from '@equinor/fusion-react-markdown/src/MarkdownEditor';

import markdown from './demo.md?raw';

const meta: Meta<typeof MarkdownEditor> = {
  title: 'Data/Markdown/Editor',
  component: MarkdownEditor,
  argTypes: {
    menuSize: {
      description: 'Size of the menu buttons',
      control: 'radio',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'MenuSizes' },
        defaultValue: { summary: 'medium' },
      },
    },
    menuItems: {
      description: 'List of visible menu buttons',
      control: 'check',
      options: ['strong', 'em', 'ordered_list', 'bullet_list', 'paragraph', 'blockquote', 'h1', 'h2', 'h3', 'tx'],
      table: {
        type: { summary: 'MdMenuItemType[]' },
        defaultValue: { summary: ['strong', 'em', 'bullet_list', 'ordered_list'] },
      },
    },
    minHeight: {
      description: 'Markdown Editor minimum height',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'Markdown editors value',
      control: 'text',
      table: {
        type: { summary: 'Markdown' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const editor: Story = {
  args: {
    value: markdown,
    menuSize: 'small',
    menuItems: ['strong', 'em', 'bullet_list', 'ordered_list', 'h1', 'h2', 'tx'],
  },
};
