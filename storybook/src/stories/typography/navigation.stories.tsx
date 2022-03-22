import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Navigation',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['navigation']),
    },
    variant: {
      disabled: true,
    },
  },
} as Meta;

type Props = Omit<TypographyProps<'navigation'>, 'ref'>;

export const Component: Story<Props> = (props) => {
  return <Typography {...props}>Typograpgy</Typography>;
};
Component.args = {
  variant: 'navigation',
  type: 'menu_title',
};

export const MenuTitle: Story<Props> = (props) => {
  return (
    <Typography {...props} type="menu_title">
      Navigation/Menu Title
    </Typography>
  );
};
MenuTitle.args = {
  variant: 'navigation',
};

export const MenuTabs: Story<Props> = (props) => {
  return (
    <Typography {...props} type="menu_tabs">
      Navigation/Menu Tabs
    </Typography>
  );
};
MenuTabs.args = {
  variant: 'navigation',
};

export const Label: Story<Props> = (props) => {
  return (
    <Typography {...props} type="label">
      Navigation/Label
    </Typography>
  );
};
Label.args = {
  variant: 'navigation',
};

export const DrawerActive: Story<Props> = (props) => {
  return (
    <Typography {...props} type="drawer_active">
      Navigation/Drawer Active
    </Typography>
  );
};
DrawerActive.args = {
  variant: 'navigation',
};

export const DrawerInactive: Story<Props> = (props) => {
  return (
    <Typography {...props} type="drawer_inactive">
      Navigation/Drawer Inactive
    </Typography>
  );
};
DrawerInactive.args = {
  variant: 'navigation',
};

export const Button: Story<Props> = (props) => {
  return (
    <Typography {...props} type="button">
      Navigation/Button
    </Typography>
  );
};
Button.args = {
  variant: 'navigation',
};

export const Breadcrumb: Story<Props> = (props) => {
  return (
    <Typography {...props} type="breadcrumb">
      Navigation/Breadcrumb
    </Typography>
  );
};
Breadcrumb.args = {
  variant: 'navigation',
};

export const BreadcrumbHover: Story<Props> = (props) => {
  return (
    <Typography {...props} type="breadcrumb_hover">
      Navigation/Breadcrumb
    </Typography>
  );
};
BreadcrumbHover.args = {
  variant: 'navigation',
};
