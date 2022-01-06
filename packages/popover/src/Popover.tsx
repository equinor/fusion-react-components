import { useState } from 'react';
import { usePopper, PopperProps, PopperChildrenProps } from 'react-popper';
import { useStyles } from './style';

export type ChildrenProps = PopperChildrenProps;
export type PopoverProps = PopperProps<any>;

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
  const fusionPopoverStyles = useStyles();

  const handleClick = () => {
    setVisibility(!visible);
  };

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
          Popper element
          {props.children}
          <span onClick={handleClick}>Close</span>
          <div ref={setArrowElement} style={styles.arrow} className={fusionPopoverStyles.arrow} data-popper-arrow />
        </div>
      )}
    </div>
  );
};

export default Popover;
