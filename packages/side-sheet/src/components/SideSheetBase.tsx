import { Scrim } from '@equinor/eds-core-react';
import { Resizable } from 're-resizable';
import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

export const StyledScrim = styled(Scrim)`
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
`;

export const StyledSideSheet = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  transition: right 10s;
  animation: Animation ease 0.3s;
  right: 0px;

  @keyframes Animation {
    0% {
      right: -500px;
    }
    100% {
      right: 0px;
    }
  }
`;

export const StyledSideSheetContent = styled.div`
  height: 100%;
  background: #fff; // TODO: token
  width: 100%;
`;

const MIN_WIDTH = 500;
export type SideSheetProps = {
  isOpen: boolean;
  isDismissable?: boolean;
  minWidth?: number;
  onClose(): void;
};

export const SideSheetBase = (props: PropsWithChildren<SideSheetProps>) => {
  const { isOpen, onClose, isDismissable, minWidth, children } = props;
  const [width, setWidth] = useState(minWidth ?? MIN_WIDTH);

  return (
    <StyledScrim open={isOpen} onClose={onClose} isDismissable={isDismissable}>
      <StyledSideSheet>
        <Resizable
          size={{ width, height: '100%' }}
          maxWidth={'100vw'}
          minWidth={minWidth ?? MIN_WIDTH}
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
              left: '1px',
            },
          }}
        >
          <StyledSideSheetContent>{children}</StyledSideSheetContent>
        </Resizable>
      </StyledSideSheet>
    </StyledScrim>
  );
};

export default SideSheetBase;
