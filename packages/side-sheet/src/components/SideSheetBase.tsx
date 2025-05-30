import { Scrim } from '@equinor/eds-core-react';
import { Resizable } from 're-resizable';
import { type PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

const StyledScrim = styled(Scrim).withConfig({
  shouldForwardProp: (prop) => prop !== 'shouldAnimate',
})<{ shouldAnimate: boolean }>`
  animation: ${({ shouldAnimate }) => (shouldAnimate ? 'ScrimAnimation ease 0.3s' : 'none')};
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

const StyledSideSheet = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'shouldAnimate',
})<{ shouldAnimate: boolean }>`
  --side-sheet-height: calc(100vh - var(--header-height, 0));
  height: var(--custom-side-sheet-height, var(--side-sheet-height, 100%));
  position: fixed;
  top: var(--custom-header-height, var(--header-height, 0));
  transition: right 10s;
  animation: ${({ shouldAnimate }) => (shouldAnimate ? 'Animation ease 0.3s' : 'none')};
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

const StyledSideSheetContent = styled.div`
  height: 100%;
  background: #fff; // TODO: token
  width: 100%;
`;

const MIN_WIDTH = 480;
export type SideSheetProps = {
  readonly isOpen: boolean;
  readonly isDismissable?: boolean;
  readonly minWidth?: number;
  readonly animate?: boolean;
  onClose(): void;
};

export const SideSheetBase = (props: PropsWithChildren<SideSheetProps>) => {
  const { isOpen, onClose, isDismissable, minWidth, children, animate } = props;
  const [width, setWidth] = useState(minWidth ?? MIN_WIDTH);

  const shouldAnimate = animate === undefined ? true : animate;

  return (
    <StyledScrim
      open={isOpen}
      onClose={onClose}
      isDismissable={isDismissable}
      shouldAnimate={shouldAnimate}
    >
      <StyledSideSheet shouldAnimate={shouldAnimate}>
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
              <svg
                width="14"
                height="25"
                viewBox="0 0 14 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Icon</title>
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
