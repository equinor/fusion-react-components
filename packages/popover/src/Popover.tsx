import { useState } from 'react';
import { usePopper, PopperProps, PopperChildrenProps } from 'react-popper';

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
      //   { name: 'preventOverflow', enabled: false },
    ],
  });

  const handleClick = () => {
    setVisibility(!visible);
  };

  return (
    <div>
      <span ref={setReferenceElement} onClick={handleClick}>
        Reference element
      </span>
      {visible && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          Popper element
          {props.children}
          <span onClick={handleClick}>Close</span>
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </div>
  );
};

export default Popover;
