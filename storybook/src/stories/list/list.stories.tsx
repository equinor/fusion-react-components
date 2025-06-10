/* eslint-disable react/no-array-index-key */
import type { Meta, StoryObj } from '@storybook/react-vite';

import { List, ListProps } from '@equinor/fusion-react-list/src/components/List';
import { ListItem } from '@equinor/fusion-react-list/src/components/ListItem';
import { CheckListItem } from '@equinor/fusion-react-list/src/components/CheckListItem';
import { RadioListItem } from '@equinor/fusion-react-list/src/components/RadioListItem';

import { Icon } from '@equinor/eds-core-react';
import { google_maps } from '@equinor/eds-icons';

Icon.add({ google_maps });

const meta: Meta<ListProps> = {
  title: 'data/List',
  component: List,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const simple: Story = {
  args: {
    children: [...Array(5)].map((_, i) => (
      <ListItem key={i} activated={i === 3}>
        <span>List item {i + 1}</span>
      </ListItem>
    )),
  },
};

export const multiline: Story = {
  args: {
    children: [...Array(5)].map((_, i) => (
      <ListItem key={i} twoline>
        <span>List item {i + 1}</span>
        <span slot="secondary">subtitle for item {i + 1}</span>
      </ListItem>
    )),
  },
};

export const withIcon: Story = {
  args: {
    children: (
      <>
        <ListItem graphic="icon">
          <span>list item with EDS icon</span>
          <Icon slot="graphic" name="google_maps" />
        </ListItem>
      </>
    ),
  },
};

export const withCheck: Story = {
  args: {
    multi: true,
    children: [...Array(5)].map((_, i) => (
      <CheckListItem key={i}>
        <span>List item {i + 1}</span>
      </CheckListItem>
    )),
  },
};

export const withRadio: Story = {
  args: {
    children: [...Array(5)].map((_, i) => (
      <RadioListItem key={i}>
        <span>List item {i + 1}</span>
      </RadioListItem>
    )),
  },
};

