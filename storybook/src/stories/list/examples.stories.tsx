import { Meta, Story } from '@storybook/react';
import { List, ListItem, ListProps } from '@equinor/fusion-react-list';

export default {
  title: 'Examples/List',
  component: List,
} as Meta;

type ComponentProps = ListProps & { initial: string };
export const Component: Story<ComponentProps> = (props: ComponentProps) => (
  <List {...props}>
    <ListItem>Item 1</ListItem>
    <ListItem>Item 2</ListItem>
    <ListItem>Item 3</ListItem>
  </List>
);
Component.args = {};

export const Simple: Story = () => (
  <List>
    <ListItem>Item 1</ListItem>
    <ListItem>Item 2</ListItem>
    <ListItem>Item 3</ListItem>
  </List>
);
