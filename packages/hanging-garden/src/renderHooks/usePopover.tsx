import { type ReactElement, useCallback, useMemo, useState } from 'react';
import * as PIXI from 'pixi.js-legacy';
import PopoverContainer from '../components/PopoverContainer';

export type UsePopover = {
  popover: ReactElement | null;
  addPopover: (hitContainer: PIXI.Container, hitArea: PIXI.Rectangle, renderPopover: () => ReactElement) => void;
};

export type Popover = {
  top: number;
  left: number;
  render: () => ReactElement;
};

/**
 * Handles popovers.
 * Holds the state of weither a popover should be shown and where.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const usePopover = (delay?: number): UsePopover => {
  const [selectedPopover, setSelectedPopover] = useState<Popover | null>(null);

  const addPopover = useCallback(
    (hitContainer: PIXI.Container, hitArea: PIXI.Rectangle, renderPopover: () => ReactElement) => {
      const hitAreaContainer = new PIXI.Container();
      hitAreaContainer.interactive = true;
      hitAreaContainer.hitArea = hitArea;

      let timer: NodeJS.Timeout;
      hitAreaContainer.on('mouseover', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setSelectedPopover({
            top: hitContainer.y + hitArea.height,
            left: hitContainer.x + hitArea.x + hitArea.width / 2,
            render: renderPopover,
          });
        }, delay || 500);
      });

      hitAreaContainer.on('mouseout', () => {
        clearTimeout(timer);
        setSelectedPopover(null);
      });

      hitContainer.addChild(hitAreaContainer);
    },
    [],
  );

  const popover = useMemo(() => {
    if (!selectedPopover) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: selectedPopover.top,
          left: selectedPopover.left,
        }}
      >
        <PopoverContainer>{selectedPopover.render()}</PopoverContainer>
      </div>
    );
  }, [selectedPopover]);

  return { popover, addPopover };
};

export default usePopover;
