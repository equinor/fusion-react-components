export type PopoverProps = { test?: boolean };

export const Popover = (props: PopoverProps): JSX.Element => {
  return (
    <div>
      Popover <span>{props.test}</span>
    </div>
  );
};

export default Popover;
