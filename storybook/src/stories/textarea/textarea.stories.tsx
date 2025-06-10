import { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '@equinor/fusion-react-textarea/src/TextArea';

const meta: Meta<typeof TextInput> = {
  title: 'data/Textarea',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

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

export const charCounter: Story = {
  args: {
    label: 'Character counter',
    charCounter: true,
    maxLength: 200,
  },
};

export const withHelpText: Story = {
  render: (props) => (
    <div style={{ display: 'flex', gap: 10 }}>
      <TextInput {...props} label="Helper" helper="This helper shows when active!" />
      <TextInput {...props} label="Persistent helper" helper="This helper is persistent!" helperPersistent />
    </div>
  ),
};
