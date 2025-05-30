import React, { useCallback } from 'react';

import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { close as closeIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { type PropsWithChildren, useRef } from 'react';
import { Actions } from './Actions';
import { Content } from './Content';
import { FullscreenIcon } from './icon/FullscreenIcon';
import { type HEXString, Indicator } from './Indicator';
import { SubTitle } from './SubTitle';
import { Title } from './Title';

import { SideSheetBase, type SideSheetProps } from './SideSheetBase';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';

const StyledFlexBox = styled.div`
  display: flex;
  z-index: 10;
`;

const StyledFlexColumn = styled(StyledFlexBox)`
  flex-direction: column;
`;

const StyledContainerWrapper = styled(StyledFlexColumn)`
  background: ${tokens.colors.ui.background__default.hex};
  height: 100%;
`;

const StyledHeader = styled(StyledFlexBox)`
  height: var(--side-sheet-header-height, 3rem);
  justify-content: space-between;
  padding: var(--side-sheet-header-padding, 1rem);
`;

type PortalSideSheet = SideSheetProps & {
  readonly minWidth?: number;
  readonly enableFullscreen?: boolean;
};

type SideSheetComponents = {
  indicator?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<{ color: HEXString }>
  >;
  title?: React.ReactElement<unknown, string | React.JSXElementConstructor<{ title: string }>>;
  subTitle?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<{ subTitle: string }>
  >;
  actions?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<PropsWithChildren<unknown>>
  >;
  content?: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<PropsWithChildren<unknown>>
  >;
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
  }, []);

  const components = flattenChildren(children).reduce((acc, child) => {
    if (!React.isValidElement(child)) return acc;
    if (child.type === Indicator) {
      acc.indicator = child;
    } else if (child.type === Title) {
      acc.title = child;
    } else if (child.type === SubTitle) {
      acc.subTitle = child;
    } else if (child.type === Content) {
      acc.content = child;
    } else if (child.type === Actions) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      acc.actions = React.cloneElement(child as React.ReactElement<any>);
    } else {
      throw Error(`unsupported child ${child.type} in SideSheet component`);
    }
    return acc;
  }, {} as SideSheetComponents);

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
              <Tooltip title="Full screen" enterDelay={500}>
                <Button variant="ghost_icon" onClick={handleFullscreenClick}>
                  <FullscreenIcon />
                </Button>
              </Tooltip>
            )}
            <Tooltip title="Close" enterDelay={500}>
              <Button variant="ghost_icon" onClick={onClose}>
                <Icon name="close" />
              </Button>
            </Tooltip>
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
