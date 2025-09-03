import { Meta, StoryObj } from '@storybook/react-vite';

import { SideSheet } from '@equinor/fusion-react-side-sheet/src/components/SideSheet';

import { Button, Icon } from '@equinor/eds-core-react';
import { help_outline } from '@equinor/eds-icons';
import { useState } from 'react';

Icon.add({ help_outline });

const meta: Meta<typeof SideSheet> = {
  title: 'UI/Side Sheet',
  component: SideSheet,
};

export default meta;

type Story = StoryObj<typeof SideSheet>;

let open = false;

export const basic: Story = {
  args: {
    isOpen: open,
    onClose: () => {
      open = false;
    },
    enableFullscreen: false,
    minWidth: 400,
    animate: true,
    children: (
      <>
        <SideSheet.Title title="title" />,
        <SideSheet.SubTitle subTitle="sub title" />,
        <SideSheet.Indicator color="#543345" />,
        <SideSheet.Actions>
          <Button
            variant="ghost_icon"
            onClick={() => {
              console.log('Custom Action Help button clicked');
            }}
          >
            <Icon data={help_outline} />
          </Button>
        </SideSheet.Actions>
        <SideSheet.Content>
          😎
          <div>
            You can choose the content padding with css: <code>--side-sheet-content-padding: 0;</code>
          </div>
        </SideSheet.Content>,
      </>
    ),
  },
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Side Sheet</Button>
        <SideSheet {...props} isOpen={open} onClose={() => setOpen(false)}></SideSheet>
      </div>
    );
  },
};

export const withoutHeader: Story = {
  args: {
    isOpen: open,
    onClose: () => {
      open = false;
    },
    enableFullscreen: true,
    minWidth: 400,
    animate: true,
    children: (
      <>
        <SideSheet.Actions>
          <Button
            variant="ghost_icon"
            onClick={() => {
              console.log('Custom Action Help button clicked');
            }}
          >
            <Icon data={help_outline} />
          </Button>
        </SideSheet.Actions>
        <SideSheet.Content>
          😎
          <div>
            You can choose the content padding with css: <code>--side-sheet-content-padding: 0;</code>
          </div>
        </SideSheet.Content>,
      </>
    ),
  },
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Side Sheet</Button>
        <SideSheet {...props} isOpen={open} onClose={() => setOpen(false)}></SideSheet>
      </div>
    );
  },
};
