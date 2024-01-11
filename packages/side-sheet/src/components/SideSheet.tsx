import React, { useCallback } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { close as closeIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { type PropsWithChildren, useRef } from 'react';
import { Actions } from './Actions';
import { Content } from './Content';
import { FullscreenIcon } from './icon/FullscreenIcon';
import { HEXString, Indicator } from './Indicator';
import { SubTitle } from './SubTitle';
import { Title } from './Title';

import { SideSheetBase, type SideSheetProps } from './SideSheetBase';
import styled from 'styled-components';

const StyledFlexBox = styled.div`
  display: flex;
`;

const StyledFlexColumn = styled(StyledFlexBox)`
  flex-direction: column;
`;

const StyledContainerWrapper = styled(StyledFlexColumn)`
  background: ${tokens.colors.ui.background__default.hex};
  height: 100%;
`;

const StyledHeader = styled(StyledFlexBox)`
  height: 3rem;
  justify-content: space-between;
  padding: 1rem;
`;

type PortalSideSheet = SideSheetProps & {
  readonly minWidth?: number;
  readonly enableFullscreen?: boolean;
};

type SideSheetComponents = {
  indicator?: React.ReactElement<unknown, string | React.JSXElementConstructor<{ color: HEXString }>>;
  title?: React.ReactElement<unknown, string | React.JSXElementConstructor<{ title: string }>>;
  subTitle?: React.ReactElement<unknown, string | React.JSXElementConstructor<{ subTitle: string }>>;
  actions?: React.ReactElement<unknown, string | React.JSXElementConstructor<PropsWithChildren<unknown>>>;
  content?: React.ReactElement<unknown, string | React.JSXElementConstructor<PropsWithChildren<unknown>>>;
};

Icon.add({
  close: closeIcon,
});

export const SideSheet = (props: PropsWithChildren<PortalSideSheet>) => {
  const { onClose, children, enableFullscreen } = props;

  const ref = useRef<HTMLDivElement>(null);
  const handleFullscreenClick = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error(err));
    } else {
      ref.current?.requestFullscreen();
    }
  }, [ref]);

  const components: SideSheetComponents = {
    indicator: undefined,
    title: undefined,
    subTitle: undefined,
    actions: undefined,
    content: undefined,
  };

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === Indicator) {
      components.indicator = child;
    } else if (child.type === Title) {
      components.title = child;
    } else if (child.type === SubTitle) {
      components.subTitle = child;
    } else if (child.type === Content) {
      components.content = child;
    } else if (child.type === Actions) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components.actions = React.cloneElement(child as React.ReactElement<any>);
    } else {
      throw Error(`unsupported child ${child.type} in SideSheet component`);
    }
  });

  if (!components.title) {
    throw Error('Title Component is required child');
  }

  if (!components.subTitle) {
    throw Error('SubTitle Component is required child');
  }

  if (!components.content) {
    throw Error('Content Component is required child');
  }

  return (
    <SideSheetBase {...props}>
      <StyledContainerWrapper ref={ref}>
        <StyledHeader>
          <StyledFlexBox>
            {components.indicator}
            <StyledFlexColumn>
              {components.title}
              {components.subTitle}
            </StyledFlexColumn>
          </StyledFlexBox>
          <StyledFlexBox>
            {components.actions}
            {enableFullscreen && (
              <Button variant="ghost_icon" onClick={handleFullscreenClick}>
                <FullscreenIcon />
              </Button>
            )}
            <Button variant="ghost_icon" onClick={onClose}>
              <Icon name="close" />
            </Button>
          </StyledFlexBox>
        </StyledHeader>
        {components.content}
      </StyledContainerWrapper>
    </SideSheetBase>
  );
};

SideSheet.Title = Title;
SideSheet.SubTitle = SubTitle;
SideSheet.Indicator = Indicator;
SideSheet.Content = Content;
SideSheet.Actions = Actions;

export default SideSheet;
