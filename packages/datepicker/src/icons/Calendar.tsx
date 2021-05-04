import React, { FunctionComponent } from 'react';

import { makeStyles, createStyles, clsx } from '@equinor/fusion-react-styles';
import Calendar from './svg/calendar.svg';

type IconProps = {
  disabled?: boolean;
};

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        fill: theme.colors.text.static_icons__tertiary.value.hex,
        height: '1.375em',
        width: 'auto',
      },
      disabled: {
        fill: theme.colors.interactive.disabled__fill.value.hex,
      },
    }),
  { name: 'fusion-table-icon' }
);

export const Icon: FunctionComponent<IconProps> = ({ disabled }: IconProps) => {
  const classes = useStyle();
  const className = clsx(classes.root, disabled && classes.disabled);

  return <Calendar className={className} />;
};

export default Icon;
