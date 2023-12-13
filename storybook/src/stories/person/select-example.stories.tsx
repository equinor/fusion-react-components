import { Meta, Story } from '@storybook/react';
import { PersonProvider, PersonAccountType, PersonSelect, PersonSelectProps } from '@equinor/fusion-react-person/src';
import { createResolve } from './resolve-mock/person-resolve-mock';

export default {
  title: 'Examples/Person/Person Select',
  component: PersonSelect,
  argTypes: {
    id: {
      type: 'string',
      description: 'HTML ID for component',
    },
    placeholder: {
      type: 'string',
      description: 'TextInput placeholder string',
    },
    initialText: {
      type: 'string',
      description: 'First item in dropdown before any search is done',
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
    meta: {
      description: 'A fwc-icon name to show AFTER each list item. may also be set per result item.',
    },
    graphic: {
      description: 'A fwc-icon name to show BEFORE each list item. may also be set per result item.',
    },
    autofocus: {
      type: 'boolean',
      description: 'Flag for setting focus on textInput on component mount',
    },
    multiple: {
      description: 'Flag for selecting multiple items.',
    },
    disabled: {
      type: 'boolean',
      description: 'Disable text input',
    },
    selectedId: {
      type: 'string',
      description: 'The pre-selected id to higlight',
    },
    leadingIcon: {
      description: 'Leading Icon to display in text input',
    },
  },
} as Meta;

export type CardProps = PersonSelectProps & {
  accountType: PersonAccountType;
};

export const Component: Story<CardProps> = (props: CardProps) => (
  <PersonProvider resolve={createResolve}>
    <div style={{ maxWidth: '420px', height: '350px', margin: '3em auto' }}>
      <PersonSelect {...props} />
    </div>
  </PersonProvider>
);
Component.args = {
  placeholder: 'Start to type to search...',
  initialText: 'The initial text result',
  variant: 'page',
  dropdownHeight: '300px',
  leadingIcon: 'search',
  onSelect: (w) => console.log('onSelect', w),
  onDropdownClosed: (w) => console.log('onDropdownClosed', w),
};
