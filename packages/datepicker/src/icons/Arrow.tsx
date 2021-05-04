import React, { FunctionComponent } from 'react';

import { FusionTheme, makeStyles, createStyles, clsx } from '@equinor/fusion-react-styles';
import ArrowBack from './svg/arrow-back.svg';
import ArrowForward from './svg/arrow-forward.svg';

type StyleProps = {
  disabled?: boolean;
};

type IconProps = {
  direction: 'forward' | 'back';
  disabled?: boolean;
  onClick?(): void;
};

const defaultStyleProps: StyleProps = {
  disabled: false,
};

const useStyle = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      icon: ({ disabled }) => ({
        fill: disabled
          ? theme.colors.interactive.disabled__fill.value.hex
          : theme.colors.interactive.primary__resting.value.hex,
        width: 'auto',
      }),
      clickable: {
        '&:hover': {
          cursor: 'pointer',
          fill: theme.colors.interactive.primary__hover.value.hex,
        },
      },
    }),
  { name: 'fusion-table-icon' }
);

export const Icon: FunctionComponent<IconProps> = ({ direction, disabled, onClick }: IconProps) => {
  const classes = useStyle(defaultStyleProps);

  return (
    <div onClick={onClick}>
      {direction === 'forward' ? (
        <ArrowForward className={clsx(classes.icon, !disabled && classes.clickable)} />
      ) : (
        <ArrowBack className={clsx(classes.icon, !disabled && classes.clickable)} />
      )}
    </div>
  );
};

export default Icon;
