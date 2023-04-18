import { Button, Icon } from '@equinor/eds-core-react';
import { help_outline } from '@equinor/eds-icons';
import { SideSheet, HEXString } from '@equinor/fusion-react-side-sheet';
import { Meta } from '@storybook/react';
import { useCallback, useState } from 'react';
Icon.add({ help_outline });
export default {
  title: 'Examples/Side-sheet',
  component: SideSheet,
} as Meta;

type Props = {
  title: string;
  subTitle: string;
  color: HEXString;
  content: string;
  minWidth: number;
  isResizable: boolean;
  fullScreen: boolean;
};

export const Component = (props: Props) => {
  const [open, setOpen] = useState(false);
  const onClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div>
      <Button onClick={onClick}>Open Side Sheet</Button>
      <SideSheet isOpen={open} onClose={onClose} enableFullscreen={props.fullScreen} minWidth={props.minWidth}>
        {props.color.length === 7 && <SideSheet.Indicator color={props.color} />}
        <SideSheet.Title title={props.title} />
        <SideSheet.SubTitle subTitle={props.subTitle} />
        <SideSheet.Actions>
          <Button
            variant="ghost_icon"
            onClick={() => {
              console.log('Custom Action Help button clicked');
            }}
          >
            <Icon name="help_outline" />
          </Button>
        </SideSheet.Actions>
        <SideSheet.Content>{props.content}</SideSheet.Content>
      </SideSheet>
    </div>
  );
};
Component.args = {
  title: 'Side Sheet Title',
  subTitle: 'Some sub title',
  color: '#c8f649',
  minWidth: 500,
  content: '',
  fullScreen: true,
};

Component.argTypes = {
  color: {
    control: { type: 'color' },
  },
};
