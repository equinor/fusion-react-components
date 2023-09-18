import { FC } from 'react';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      divider: {
        margin: `0 ${theme.spacing.comfortable.medium.getVariable('padding')}`,
      },
    }),
  { name: 'fusion-breadcrumb-divider' },
);

const Divider: FC = (): JSX.Element => {
  const style = useStyles();
  return <div className={style.divider}>/</div>;
};

export default Divider;
