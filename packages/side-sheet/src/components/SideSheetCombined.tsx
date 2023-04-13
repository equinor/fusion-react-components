import { css } from '@emotion/css';
import { Button, Icon, Scrim } from '@equinor/eds-core-react';
import { close as closeIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Resizable } from 're-resizable';
import React from 'react';
import { PropsWithChildren, useRef, useState } from 'react';
import { Actions } from './Actions';
import { Content } from './Content';
import { FullscreenIcon } from './fullscreen-icon/FullscreenIcon';
import { HEXString, Indicator } from './Indicator';
import { SubTitle } from './SubTitle';
import { Title } from './Title';

const styles = {
  scrim: css`
    animation: ScrimAnimation ease 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    overflow: hidden !important;
    @keyframes ScrimAnimation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  layoutWrapper: css`
    height: 100%;
    background: #fff; // TODO: token
    width: 100%;
  `,
  sideSheet: css`
    height: 100vh;
    position: fixed;
    top: 0;
    transition: right 10s;
    animation: Animation ease 0.3s;
    right: 0px;
    box-shadow: -2px 0px 10px 0px #00000040;

    @keyframes Animation {
      0% {
        right: -500px;
      }
      100% {
        right: 0px;
      }
    }
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    background: ${tokens.colors.ui.background__default.hex};
  `,
  header: css`
    padding: 1rem;
    height: 48px;
    display: flex;
    justify-content: space-between;
  `,
  titleWrapper: css`
    display: flex;
    flex-direction: column;
  `,
  contentWrapper: css`
    overflow-y: auto;
    height: calc(100vh - 48px - 2rem);
    padding-left: 1rem;
  `,
  flex: css`
    display: flex;
  `,
  titleContentWrapper: css`
    display: flex;
    flex-direction: column;
  `,
};

const MIN_WIDTH = 500;

type PortalSideSheet = {
  isOpen: boolean;
  isDismissable?: boolean;
  onClose(): void;
  minWidth?: number;
  enableFullscreen?: boolean;
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

export const SideSheet = ({
  isOpen,
  onClose,
  isDismissable = true,
  children,
  minWidth,
  enableFullscreen,
}: PropsWithChildren<PortalSideSheet>) => {
  const [width, setWidth] = useState(minWidth || MIN_WIDTH);

  const ref = useRef<HTMLDivElement>(null);
  function handleFullscreenClick() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error(err));
    } else {
      ref.current?.requestFullscreen();
    }
  }

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
      components.actions = React.cloneElement(child as React.ReactElement<any>, {
        sideSheetRef: ref,
      });
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
    <Scrim className={styles.scrim} open={isOpen} onClose={onClose} isDismissable={isDismissable}>
      <div className={styles.sideSheet}>
        <Resizable
          size={{ width, height: '100%' }}
          maxWidth={'100vw'}
          minWidth={minWidth || MIN_WIDTH}
          onResizeStop={(e, direction, ref, d) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            setWidth(width + d.width);
          }}
          handleComponent={{
            left: (
              <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="7.21924"
                  y="21.274"
                  width="17"
                  height="2"
                  transform="rotate(-90 7.21924 21.274)"
                  fill="#6F6F6F"
                />
                <rect
                  x="11.2192"
                  y="21.274"
                  width="17"
                  height="2"
                  transform="rotate(-90 11.2192 21.274)"
                  fill="#6F6F6F"
                />
              </svg>
            ),
          }}
          handleStyles={{
            left: {
              position: 'absolute',
              top: '45%',
              left: '-3px',
            },
          }}
        >
          <div className={styles.layoutWrapper}>
            <div ref={ref} className={styles.wrapper}>
              <div className={styles.header}>
                <div className={styles.flex}>
                  {components.indicator}
                  <div className={styles.titleContentWrapper}>
                    {components.title}
                    {components.subTitle}
                  </div>
                </div>
                <div className={styles.flex}>
                  {components.actions}
                  {enableFullscreen && (
                    <Button variant="ghost_icon" onClick={handleFullscreenClick}>
                      <FullscreenIcon />
                    </Button>
                  )}
                  <Button variant="ghost_icon" onClick={onClose}>
                    <Icon name="close" />
                  </Button>
                </div>
              </div>
              <div className={styles.contentWrapper}>{components.content}</div>
            </div>
          </div>
        </Resizable>
      </div>
    </Scrim>
  );
};

SideSheet.Title = Title;
SideSheet.SubTitle = SubTitle;
SideSheet.Indicator = Indicator;
SideSheet.Content = Content;
SideSheet.Actions = Actions;

export default SideSheet;
