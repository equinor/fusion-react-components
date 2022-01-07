import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { close } from '@equinor/eds-icons';
import { FC } from 'react';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      iconContainer: {},
      icon: {
        fill: theme.colors.interactive.primary__resting.getVariable('color'),
        '&:hover': {
          fill: theme.colors.interactive.primary__hover.getVariable('color'),
          cursor: 'pointer',
        },
      },
    }),
  { name: 'fusion-popover-close-icon' }
);

export const CloseIcon: FC = () => {
  const styles = useStyle();
  return (
    <svg
      className={styles.icon}
      width={close.width}
      height={close.height}
      viewBox={`0 0 ${close.width} ${close.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={close.svgPathData} />
    </svg>
  );
};

export default CloseIcon;
