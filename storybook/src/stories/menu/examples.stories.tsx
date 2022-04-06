import { useRef, useState, useCallback } from 'react';
import { Meta, Story } from '@storybook/react';
import { Menu, MenuProps } from '@equinor/fusion-react-menu/src';
import { ListItem } from '@equinor/fusion-react-list';
import Button from '@equinor/fusion-react-button';

export default {
  title: 'Examples/Menu',
  component: Menu,
} as Meta;

export const Component: Story<MenuProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const onClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
      <div style={{ position: 'relative' }}>
        <Button ref={buttonRef} onClick={onClick}>
          Menu
        </Button>
        <Menu {...props} anchor={buttonRef.current} open={open} onClosed={() => setOpen(false)}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </Menu>
      </div>
    </div>
  );
};
Component.args = {
  corner: 'BOTTOM_LEFT',
  menuCorner: 'START',
};
