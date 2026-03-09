import { useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { PersonListItem, PersonProvider } from '@equinor/fusion-react-person';
import type { PersonItemSize } from '@equinor/fusion-react-person';
import { Theme } from '../../components/Theme';

import { Menu, Button, Icon } from '@equinor/eds-core-react';
import { more_vertical } from '@equinor/eds-icons';
Icon.add({ more_vertical });

import { resolver } from './person-resolver';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof PersonListItem> = {
  title: 'person/List item',
  component: PersonListItem,
};

export default meta;

type Story = StoryObj<typeof PersonListItem>;

export const basic: Story = {
  argTypes: {
    resolveId: { control: 'text', description: 'The id used to resolve the person, e.g. azureId or upn', type: { name: 'string' } },
    dataSource: { control: 'object', description: 'The person data to use for the cell. If provided with valid avatarUrl, the cell will not resolve the person.', type: { name: 'symbol' } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the cell. small, medium or large.',
      type: { name: 'string' },
      defaultValue: 'medium',
    },
    clickable: { control: 'boolean', description: 'Whether the list item is clickable. A clickable list item will have interactive styling', type: { name: 'boolean' }, defaultValue: false },
    azureId: { control: 'text', description: '@deprecated: Use resolveId instead. The azureId of the person to resolve', type: { name: 'string' } },
    upn: { control: 'text', description: '@deprecated: Use resolveId instead. The UPN of the person to resolve', type: { name: 'string' } },
  },
  decorators: [
    (Story) => (
      <Theme>
        <PersonProvider resolve={resolver}>
          <Story />
        </PersonProvider>
      </Theme>
    ),
  ],
  args: {
    resolveId: '49132c24-6ea4-41fe-8221-112f314573f0',
  },
};

export const clickable: Story = {
  ...basic,
  args: {
    ...basic.args,
    clickable: true,
  },
};

export const sizes: Story = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(['small', 'medium', 'large'] as PersonItemSize[]).map((size) => (
        <PersonListItem key={size} {...props} size={size} />
      ))}
    </div>
  ),
};

export const withToolbar: Story = {
  ...basic,
  render: (props) => {
    faker.seed(123);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
      setIsOpen(true);
    };
    const closeMenu = () => {
      setAnchorEl(null);
      setIsOpen(false);
    };

    const items = useMemo(
      () =>
        [...Array(5)].map((_, index) => (
          <PersonListItem key={index} {...props} resolveId={faker.string.uuid()}>
            <Button variant="ghost_icon" onClick={openMenu}>
              <Icon name="more_vertical" />
            </Button>
          </PersonListItem>
        )),
      [props],
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items}
        <Menu open={isOpen} onClose={closeMenu} anchorEl={anchorEl}>
          <Menu.Item>Pressure</Menu.Item>
          <Menu.Item>Bearing</Menu.Item>
          <Menu.Item>Cable</Menu.Item>
        </Menu>
      </div>
    );
  },
};
