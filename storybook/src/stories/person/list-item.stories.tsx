/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { PersonListItem } from '@equinor/fusion-react-person/src/PersonListItem';
import { PersonItemSize } from '@equinor/fusion-react-person/src/index';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
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
    azureId: '49132c24-6ea4-41fe-8221-112f314573f0',
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
      setIsOpen(true);
    };
    const closeMenu = () => {
      setAnchorEl(null);
      setIsOpen(false);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const items = useMemo(
      () =>
        [...Array(5)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <PersonListItem key={index} {...props} azureId={faker.string.uuid()}>
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
