import { css } from '@emotion/css';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { close as closeIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren, useRef } from 'react';
import { FullscreenIcon } from './fullscreen-icon/FullscreenIcon';

import styled from '@emotion/styled';

const style = {
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
  `,
  flex: css`
    display: flex;
  `,
  titleContentWrapper: css`
    display: flex;
    flex-direction: column;
  `,
};

export const StyledIndicator = styled.span<{ color?: HEXString }>`
  background-color: ${({ color }) => color || 'red'};
  height: 48px;
  width: 16px;
  margin-right: 1rem;
`;

type HEXString = `#${string}`;

interface SideSheetHeaderProps {
  title: string;
  subTitle: string;
  color?: HEXString;
  close: () => void;
}

Icon.add({
  close: closeIcon,
});

export const SideSheetLayout = ({
  children,
  title,
  subTitle,
  color,
  close,
}: PropsWithChildren<SideSheetHeaderProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleFullscreenClick() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error(err));
    } else {
      ref.current?.requestFullscreen();
    }
  }

  return (
    <div ref={ref} className={style.wrapper}>
      <div className={style.header}>
        <div className={style.flex}>
          {color && <StyledIndicator color={color} />}
          <div className={style.titleContentWrapper}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="meta">{subTitle}</Typography>
          </div>
        </div>
        <div className={style.flex}>
          <Button variant="ghost_icon" onClick={handleFullscreenClick}>
            <FullscreenIcon />
          </Button>
          <Button variant="ghost_icon" onClick={close}>
            <Icon name="close" />
          </Button>
        </div>
      </div>
      <div className={style.contentWrapper}>{children}</div>
    </div>
  );
};
