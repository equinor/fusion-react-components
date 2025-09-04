import { Meta, StoryObj } from '@storybook/react-vite';

import { SideSheet } from '@equinor/fusion-react-side-sheet/src/components/SideSheet';

import { Button, Icon } from '@equinor/eds-core-react';
import { help_outline } from '@equinor/eds-icons';
import { useState } from 'react';
import styled from 'styled-components';

Icon.add({ help_outline });

const meta: Meta<typeof SideSheet> = {
  title: 'UI/Side Sheet',
  component: SideSheet,
};

export default meta;

type Story = StoryObj<typeof SideSheet>;

let open = false;

const Styled = {
  Wrapper: styled.div`
    --side-sheet-content-padding: 4rem 1rem;
  `,
  WrapperNoPadding: styled.div`
    --side-sheet-content-padding: 0;
  `,
}

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
          <p>
            You can choose the content padding with css: <code>--side-sheet-content-padding: 4rem 1rem;</code>
          </p>
          <p>
            Intended use for slotted apps in portal.
          </p>
        </SideSheet.Content>,
      </>
    ),
  },
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <Styled.Wrapper>
        <Button onClick={() => setOpen(true)}>Open Side Sheet</Button>
        <SideSheet {...props} isOpen={open} onClose={() => setOpen(false)}></SideSheet>
      </Styled.Wrapper>
    );
  },
};

export const padding: Story = {
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
      <Styled.WrapperNoPadding>
        <Button onClick={() => setOpen(true)}>Open Side Sheet</Button>
        <SideSheet {...props} isOpen={open} onClose={() => setOpen(false)}></SideSheet>
      </Styled.WrapperNoPadding>
    );
  },
};
