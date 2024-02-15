import { Meta, Story } from '@storybook/react';
import { PersonProvider, PersonSelect, PersonSelectProps } from '@equinor/fusion-react-person/src';
import { createResolve } from './resolve-mock/person-resolve-mock';
import { PersonSelectEvent } from '../../../../packages/person/src/PersonSelect';

export default {
  title: 'Examples/Person/Person Select',
  component: PersonSelect,
  argTypes: {
    placeholder: {
      type: 'string',
      description: 'TextInput placeholder string',
    },
    variant: {
      type: 'string',
      description: 'The type of Searchabledropdown to render, multiple variants for header or page usage',
      control: 'select',
      options: ['page', 'page-outlined', 'page-dense', 'header', 'header-filled'],
    },
    dropdownHeight: {
      description: 'The scroll height for dropdown result list',
    },
    label: {
      description: 'Textinput label',
    },
    value: {
      description: 'The selected value do display in TextInput',
    },
    autofocus: {
      type: 'boolean',
      description: 'Flag for setting focus on textInput on component mount',
    },
    disabled: {
      type: 'boolean',
      description: 'Disable text input',
    },
    leadingIcon: {
      description: 'Leading Icon to display in text input',
    },
  },
  args: {
    placeholder: 'Start to type to search...',
    dropdownHeight: '300px',
    onSelect: (w: PersonSelectEvent) => console.log('onSelect', w),
    onDropdownClosed: (w: Event) => console.log('onDropdownClosed', w),
  },
} as Meta;

export const Component: Story<PersonSelectProps> = (props: PersonSelectProps) => (
  <PersonProvider resolve={createResolve}>
    <div style={{ maxWidth: '420px', height: '350px', margin: '3em auto' }}>
      <PersonSelect {...props} />
    </div>
  </PersonProvider>
);
