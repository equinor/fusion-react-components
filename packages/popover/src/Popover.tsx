import { useCallback, useState } from 'react';
import { usePopper, PopperProps, PopperChildrenProps } from 'react-popper';
import { useStyles } from './style';

export type ChildrenProps = PopperChildrenProps;
export type PopoverProps = PopperProps<any> & {
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
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
          offset: [0, 10],
        },
      },
      //   { name: 'preventOverflow', enabled: false },
    ],
    strategy: props.strategy,
  });
  const fusionPopoverStyles = useStyles({
    width: props.width,
    height: props.height,
    color: props.color,
    backgroundColor: props.backgroundColor,
  });

  const handleClick = useCallback(() => {
    setVisibility(!visible);
  }, [setVisibility, visible]);

  return (
    <div>
      <span ref={setReferenceElement} onClick={handleClick}>
        Reference element
      </span>
      {visible && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className={fusionPopoverStyles.content}
          {...attributes.popper}
        >
          <div className={fusionPopoverStyles.titleContainer}>
            <div>Popper element (Title)</div>
            <span onClick={handleClick} className={fusionPopoverStyles.close}>
              Close
            </span>
          </div>

          {props.children}
          <div ref={setArrowElement} style={styles.arrow} className={fusionPopoverStyles.arrow} data-popper-arrow />
        </div>
      )}
    </div>
  );
};

export default Popover;
