import { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { PersonInfo, PersonProvider, PersonSelect, PersonSelectProps } from '@equinor/fusion-react-person/src';
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
      description: 'The type of PersonSelect to render, multiple variants for header or page usage',
      control: 'select',
      options: ['page', 'page-outlined', 'page-dense', 'header', 'header-filled'],
    },
    dropdownHeight: {
      description: 'The scroll height for dropdown result list',
    },
    label: {
      description: 'TextInput label',
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

export const SelectedPersonNull: Story<PersonSelectProps> = (props: PersonSelectProps) => (
  <PersonProvider resolve={createResolve}>
    <div style={{ maxWidth: '420px', height: '350px', margin: '3em auto' }}>
      <PersonSelect {...props} />
    </div>
  </PersonProvider>
);
SelectedPersonNull.args = {
  selectedPerson: null,
};

export const SelectedPersonByUpn: Story<PersonSelectProps> = ({ selectedPerson: _, ...props }: PersonSelectProps) => {
  const [selected, setSelected] = useState<PersonInfo | string | null | undefined>(undefined);

  // set selectedPerson on next render to await resolver.
  useEffect(() => {
    setSelected('abby@sience.com');
  }, [setSelected]);

  return (
    <PersonProvider resolve={createResolve}>
      <div style={{ maxWidth: '420px', height: '350px', margin: '3em auto' }}>
        <PersonSelect selectedPerson={selected} {...props} />
      </div>
    </PersonProvider>
  );
};

export const SelectedPersonByAzureID: Story<PersonSelectProps> = ({
  selectedPerson: _,
  ...props
}: PersonSelectProps) => {
  const [selected, setSelected] = useState<PersonInfo | string | null | undefined>(undefined);

  // set selectedPerson on next render to await resolver.
  useEffect(() => {
    setSelected('49132c24-6ea4-41fe-8221-112f314573f0');
  }, [setSelected]);

  return (
    <PersonProvider resolve={createResolve}>
      <div style={{ maxWidth: '420px', height: '350px', margin: '3em auto' }}>
        <PersonSelect selectedPerson={selected} {...props} />
      </div>
    </PersonProvider>
  );
};

export const SelectedPersonByPersonInfo: Story<PersonSelectProps> = ({
  selectedPerson: _,
  ...props
}: PersonSelectProps) => {
  const [selected, setSelected] = useState<PersonInfo | string | null | undefined>(undefined);

  // set selectedPerson on next render to await resolver.
  useEffect(() => {
    setSelected({ azureId: '49132c24-6ea4-41fe-8221-112f314573f0' });
  }, [setSelected]);

  return (
    <PersonProvider resolve={createResolve}>
      <div style={{ maxWidth: '420px', height: '350px', margin: '3em auto' }}>
        <PersonSelect selectedPerson={selected} {...props} />
      </div>
    </PersonProvider>
  );
};
