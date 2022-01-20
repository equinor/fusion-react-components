import { ReactNode, useCallback, useState } from 'react';
import { usePopper, PopperChildrenProps, Modifier, StrictModifierNames } from 'react-popper';
import { CloseIcon } from '.';
import { useStyles } from './style';
import useHandleClickOutside from './useHandleClickOutside';
import { Placement, PositioningStrategy, VirtualElement, State } from '@popperjs/core';

export type PopoverProps = {
  children: (props: PopperChildrenProps) => ReactNode;
  innerRef?: React.Ref<any>;
  modifiers?: ReadonlyArray<Modifier<StrictModifierNames>> | undefined;
  placement?: Placement;
  strategy?: PositioningStrategy;
  referenceElement?: HTMLElement | VirtualElement;
  onFirstUpdate?: (state: Partial<State>) => void;

  width?: string;
  height?: string;
  title?: ReactNode;
  baseElement?: ReactNode;
};

export const Popover = (props: PopoverProps): JSX.Element => {
  const [visible, setVisibility] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 15],
        },
      },
    ],
    strategy: props.strategy,
  });
  const popoverStyles = useStyles({
    width: props.width,
    height: props.height,
  });

  const handleClick = useCallback(() => {
    setVisibility(!visible);
  }, [setVisibility, visible]);

  const { ref: PopoverRef } = useHandleClickOutside(setVisibility);

  return (
    <span ref={PopoverRef}>
      <span ref={setReferenceElement} onClick={handleClick} className={popoverStyles.baseElement}>
        {props.baseElement}
      </span>
      {visible && (
        <div ref={setPopperElement} style={styles.popper} className={popoverStyles.content} {...attributes.popper}>
          <div className={popoverStyles.titleContainer}>
            {props.title && <div className={popoverStyles.title}>{props.title}</div>}
            <span onClick={handleClick} className={popoverStyles.close}>
              <CloseIcon />
            </span>
          </div>
          {props.title && <div className={popoverStyles.divider}></div>}
          <div className={popoverStyles.contentContainer}>{props.children}</div>
          <div ref={setArrowElement} style={styles.arrow} className={popoverStyles.arrow} data-popper-arrow />
        </div>
      )}
    </span>
  );
};

export default Popover;
