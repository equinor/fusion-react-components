import { Meta, StoryObj } from '@storybook/react';

import { TextInput, type TextInputProps } from '@equinor/fusion-react-textarea/src/TextArea';

const meta: Meta<TextInputProps> = {
  title: 'data/Textarea',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const basic: Story = {
  args: {
    label: 'basic',
  },
};

export const size: Story = {
  args: {
    label: 'Multiple rows',
    rows: 6,
  },
};

export const required: Story = {
  args: {
    label: 'required',
    required: true,
  },
};

export const disabled: Story = {
  args: {
    label: 'required',
    disabled: true,
  },
};

// TODO - this does not seem to work, check web component
// export const charCounter: Story = {
//   args: {
//     label: 'Character counter',
//     charCounter: true,
//   },
// };

export const withHelpText: Story = {
  render: (props) => (
    <div style={{ display: 'flex', gap: 10 }}>
      <TextInput {...props} label="Helper" helper="This helper shows when active!" />
      <TextInput {...props} label="Persistent helper" helper="This helper is persistent!" helperpersistent />
    </div>
  ),
};
