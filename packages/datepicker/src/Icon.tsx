import { FunctionComponent } from 'react';
import { FusionTheme, makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { IconData } from '@equinor/eds-icons';

type StyleProps = {
  size?: string;
};

type IconProps = {
  icon: IconData;
  size?: string;
};

const useStyle = makeStyles<FusionTheme, StyleProps>(
  () =>
    createStyles({
      root: ({ size }) => ({
        fill: 'currentColor',
        height: size ?? '1.375em',
        width: 'auto',
        verticalAlign: 'middle',
      }),
    }),
  { name: 'fusion-datepicker-icon' }
);

export const Icon: FunctionComponent<IconProps> = ({ icon, size }: IconProps) => {
  const classes = useStyle({ size });
  return (
    <svg
      className={classes.root}
      width={icon.width}
      height={icon.height}
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={icon.svgPathData} />
    </svg>
  );
};

export default Icon;
