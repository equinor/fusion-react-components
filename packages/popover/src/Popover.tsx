import { ReactNode, useCallback, useState, FC } from 'react';
import { usePopper } from 'react-popper';
import { CloseIcon } from '.';
import { useStyles } from './style';
import useHandleClickOutside from './useHandleClickOutside';
import { Placement, PositioningStrategy } from '@popperjs/core';

export type PopoverProps = {
  placement?: Placement;
  strategy?: PositioningStrategy;
  width?: string;
  height?: string;
  baseElement?: ReactNode;
  title?: ReactNode;
  showCloseIcon?: boolean;
  setVisibility: (isVisible: boolean) => void;
  visible: boolean;
};

export const Popover: FC<PopoverProps> = ({
  children,
  placement,
  strategy,
  width,
  height,
  baseElement,
  title,
  showCloseIcon = true,
  setVisibility,
  visible,
}): JSX.Element => {
  const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    strategy: strategy,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  const popoverStyles = useStyles({
    width: width,
    height: height,
  });

  const handleClick = useCallback(() => {
    setVisibility(!visible);
  }, [setVisibility, visible]);

  const { ref: PopoverRef } = useHandleClickOutside(setVisibility);

  return (
    <span ref={PopoverRef}>
      <span ref={setReferenceElement} onClick={handleClick} className={popoverStyles.baseElement}>
        {baseElement}
      </span>
      {visible && (
        <div ref={setPopperElement} style={styles.popper} className={popoverStyles.content} {...attributes.popper}>
          {(title || showCloseIcon) && (
            <>
              <div className={popoverStyles.titleContainer}>
                {title && <div className={popoverStyles.title}>{title}</div>}
                {showCloseIcon && (
                  <span onClick={handleClick} className={popoverStyles.close}>
                    <CloseIcon />
                  </span>
                )}
              </div>
              <div className={popoverStyles.divider}></div>
            </>
          )}
          <div className={popoverStyles.contentContainer}>{children}</div>
          <div ref={setArrowElement} style={styles.arrow} className={popoverStyles.arrow} data-popper-arrow />
        </div>
      )}
    </span>
  );
};

export default Popover;
