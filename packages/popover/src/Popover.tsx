import { ReactNode, useCallback, useState, FC } from 'react';
import { usePopper } from 'react-popper';
import { Icon } from '@equinor/fusion-react-icon';
import { useStyles } from './style';
import useHandleClickOutside from './useHandleClickOutside';
import { Placement, PositioningStrategy } from '@popperjs/core';

export type PopoverProps = {
  children?: ReactNode;
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
}: PopoverProps): JSX.Element => {
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
          offset: [0, 10],
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
      {/* TODO */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span ref={setReferenceElement} onClick={handleClick} className={popoverStyles.baseElement}>
        {baseElement}
      </span>
      {visible && (
        <div ref={setPopperElement} style={styles.popper} className={popoverStyles.content} {...attributes.popper}>
          {(title || showCloseIcon) && (
            <>
              <div className={popoverStyles.titleContainer}>
                {title && <div className={popoverStyles.title}>{title}</div>}
                {showCloseIcon && <Icon icon={'close'} className={popoverStyles.close} onClick={handleClick} />}
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
