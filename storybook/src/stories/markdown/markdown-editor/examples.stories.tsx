import { MarkdownEditor, MarkdownEditorProps, MenuSizes } from '@equinor/fusion-react-markdown/src';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Examples/Markdown/Editor',
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
      options: ['strong', 'em', 'ordered_list', 'bullet_list', 'paragraph', 'blockquote', 'h1', 'h2', 'h3'],
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
} as Meta;

export const Component: Story<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
  const MarkdownEditor = (props: MarkdownEditorProps) => <fwc-markdown-editor {...props} />;
  return <MarkdownEditor {...props} />;
};
Component.args = {
  menuItems: ['strong', 'em', 'bullet_list', 'ordered_list', 'h1', 'h2'],
  menuSize: 'medium',
  minHeight: '150px',
};

export const onInputEvent: Story<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
  const initialMarkdown = `***Open console and start using editor***`;
  return (
    <MarkdownEditor
      {...props}
      onInput={(e) => {
        console.log('Event', e);
      }}
    >
      {initialMarkdown}
    </MarkdownEditor>
  );
};

export const InitialMarkdown: Story<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
  const initialMarkdown = `# This is markdown \n ## This is also markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`;
  return <MarkdownEditor {...props}>{initialMarkdown}</MarkdownEditor>;
};

export const Size: Story<{ sizes: Array<MenuSizes> }> = (props: { sizes: Array<MenuSizes> }) => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
    {props.sizes.map((size) => (
      <div key={size}>
        <MarkdownEditor menuSize={size} />
      </div>
    ))}
  </div>
);
Size.args = {
  sizes: ['small', 'medium', 'large'],
};
