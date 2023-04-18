import { css } from '@emotion/css';
import { Scrim } from '@equinor/eds-core-react';
import { Resizable } from 're-resizable';
import { PropsWithChildren, useState } from 'react';

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
  contentWrapper: css`
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

    @keyframes Animation {
      0% {
        right: -500px;
      }
      100% {
        right: 0px;
      }
    }
  `,
};

const MIN_WIDTH = 500;
type PortalSideSheet = {
  isOpen: boolean;
  isDismissable?: boolean;
  onClose(): void;
};

export const SideSheet = ({ isOpen, onClose, isDismissable, children }: PropsWithChildren<PortalSideSheet>) => {
  const [width, setWidth] = useState(MIN_WIDTH);

  return (
    <Scrim className={styles.scrim} open={isOpen} onClose={onClose} isDismissable={isDismissable}>
      <div className={styles.sideSheet}>
        <Resizable
          size={{ width, height: '100%' }}
          maxWidth={'100vw'}
          minWidth={MIN_WIDTH}
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
          <div className={styles.contentWrapper}>{children}</div>
        </Resizable>
      </div>
    </Scrim>
  );
};

export default SideSheet;
