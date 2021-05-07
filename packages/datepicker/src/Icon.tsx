import { FunctionComponent } from 'react';
import { FusionTheme, makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { IconData } from '@equinor/eds-icons';

type StyleProps = {
  size?: string;
};

type IconProps = {
  className?: string;
  icon: IconData;
  size?: string;
  onClick?(): void;
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

export const Icon: FunctionComponent<IconProps> = ({ className, icon, size, onClick }: IconProps) => {
  const classes = useStyle({ size });
  return (
    <div className={className} onClick={onClick}>
      <svg
        className={classes.root}
        width={icon.width}
        height={icon.height}
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d={icon.svgPathData} />
      </svg>
    </div>
  );
};

export default Icon;
