import { Scrim } from '@equinor/eds-core-react';
import { Resizable } from 're-resizable';
import {
  type KeyboardEvent,
  type PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { HandlerIcon } from './icon/HandlerIcon';

const RESIZE_RAIL_WIDTH = 16;

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
  shouldForwardProp: (prop) => prop !== 'shouldAnimate' && prop !== 'isResizeActive',
})<{ shouldAnimate: boolean; isResizeActive: boolean }>`
  --side-sheet-height: calc(100vh - var(--header-height, 0px));
  --resize-rail-width: ${RESIZE_RAIL_WIDTH}px;
  --resize-border-color: var(--eds-color-border-subtle);
  --resize-background-color: ${({ isResizeActive }) =>
    isResizeActive ? 'var(--resize-border-color)' : 'var(--eds-color-bg-surface)'};
  height: var(--custom-side-sheet-height, var(--side-sheet-height, 100%));
  position: fixed;
  top: var(--custom-header-height, var(--header-height, 0px));
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

const StyledSideSheetContent = styled.div<{ $isResizable: boolean }>`
  height: 100%;
  background: var(--eds-color-bg-surface);
  border-left: ${({ $isResizable }) =>
    $isResizable ? '0' : '2px solid var(--eds-color-border-subtle)'};
  box-sizing: border-box;
  width: 100%;
`;

const StyledResizeHandle = styled.div`
  align-items: center;
  background: var(--resize-background-color);
  box-sizing: border-box;
  cursor: col-resize;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  &::before {
    border-left: 2px solid var(--resize-border-color);
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
  }

  svg {
    flex-shrink: 0;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid var(--eds-color-border-focus);
    outline-offset: -2px;
  }
`;

const MIN_WIDTH = 480;
const KEYBOARD_RESIZE_STEP = 16;

/** Defines the visibility, sizing, and dismissal behavior of a side sheet. */
export type SideSheetProps = {
  readonly isOpen: boolean;
  readonly isDismissable?: boolean;
  readonly minWidth?: number;
  readonly defaultWidth?: number | `${number}${'%' | 'vw' | 'px' | 'em'}`;
  readonly disableResize?: boolean;
  readonly animate?: boolean;
  onClose(): void;
};

/** Provides the resizable and dismissable foundation used by the composed side sheet. */
export const SideSheetBase = (props: PropsWithChildren<SideSheetProps>) => {
  const {
    isOpen,
    onClose,
    isDismissable,
    minWidth,
    defaultWidth,
    disableResize = false,
    children,
    animate,
  } = props;
  const minimumWidth = minWidth ?? MIN_WIDTH;
  const initialWidth =
    typeof defaultWidth === 'number'
      ? Math.max(defaultWidth, minimumWidth)
      : (defaultWidth ?? minimumWidth);
  const [width, setWidth] = useState(initialWidth);
  const [isHandleHovered, setIsHandleHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [measuredWidth, setMeasuredWidth] = useState(
    typeof initialWidth === 'number' ? initialWidth : minimumWidth,
  );
  const [maximumWidth, setMaximumWidth] = useState(minimumWidth);
  const contentRef = useRef<HTMLDivElement>(null);
  const effectiveMinimumWidth = disableResize ? minimumWidth : Math.min(minimumWidth, maximumWidth);

  useEffect(() => {
    if (disableResize) {
      setIsHandleHovered(false);
      setIsResizing(false);
    }
  }, [disableResize]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updateMaximumWidth = () => {
      setMaximumWidth(
        disableResize
          ? Math.max(minimumWidth, window.innerWidth)
          : Math.max(0, window.innerWidth - RESIZE_RAIL_WIDTH),
      );
    };

    updateMaximumWidth();
    window.addEventListener('resize', updateMaximumWidth);
    return () => window.removeEventListener('resize', updateMaximumWidth);
  }, [isOpen, minimumWidth, disableResize]);

  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      setMeasuredWidth(Math.min(contentRef.current.offsetWidth, maximumWidth));
    }
  }, [isOpen, maximumWidth]);

  const handleResizeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;

    const currentWidth = contentRef.current.offsetWidth;
    let nextWidth: number;

    switch (event.key) {
      case 'ArrowLeft':
        nextWidth = currentWidth + KEYBOARD_RESIZE_STEP;
        break;
      case 'ArrowRight':
        nextWidth = currentWidth - KEYBOARD_RESIZE_STEP;
        break;
      // WAI-ARIA window splitter: Home/End target pane size, not separator position.
      // https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
      case 'Home':
        nextWidth = effectiveMinimumWidth;
        break;
      case 'End':
        nextWidth = maximumWidth;
        break;
      default:
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    const clampedWidth = Math.max(effectiveMinimumWidth, Math.min(maximumWidth, nextWidth));
    setWidth(clampedWidth);
    setMeasuredWidth(clampedWidth);
  };

  const shouldAnimate = animate === undefined ? true : animate;

  return (
    <StyledScrim
      open={isOpen}
      onClose={onClose}
      isDismissable={isDismissable}
      shouldAnimate={shouldAnimate}
    >
      <StyledSideSheet
        shouldAnimate={shouldAnimate}
        isResizeActive={!disableResize && (isHandleHovered || isResizing)}
      >
        <Resizable
          size={{ width, height: '100%' }}
          maxWidth={disableResize ? '100vw' : maximumWidth}
          minWidth={effectiveMinimumWidth}
          enable={disableResize ? false : undefined}
          onResizeStart={() => setIsResizing(true)}
          onResize={(_event, _direction, element) => setMeasuredWidth(element.offsetWidth)}
          onResizeStop={(event, _direction, element) => {
            event.stopPropagation();
            event.stopImmediatePropagation();
            setWidth(element.offsetWidth);
            setMeasuredWidth(element.offsetWidth);
            setIsResizing(false);
          }}
          handleComponent={{
            left: (
              <StyledResizeHandle
                role="separator"
                aria-label="Resize side sheet (Left arrow widens, Right arrow narrows, Home sets minimum width, End sets maximum width)"
                aria-orientation="vertical"
                aria-valuemin={effectiveMinimumWidth}
                aria-valuemax={maximumWidth}
                aria-valuenow={measuredWidth}
                aria-valuetext={`${measuredWidth} pixels wide`}
                tabIndex={0}
                onKeyDown={handleResizeKeyDown}
                onMouseEnter={() => setIsHandleHovered(true)}
                onMouseLeave={() => setIsHandleHovered(false)}
              >
                <HandlerIcon />
              </StyledResizeHandle>
            ),
          }}
          handleStyles={{
            left: {
              width: 'var(--resize-rail-width)',
              height: '100%',
              top: '0',
              left: 'calc(-1 * var(--resize-rail-width))',
              zIndex: 2,
            },
          }}
        >
          <StyledSideSheetContent ref={contentRef} $isResizable={!disableResize}>
            {children}
          </StyledSideSheetContent>
        </Resizable>
      </StyledSideSheet>
    </StyledScrim>
  );
};

export default SideSheetBase;
