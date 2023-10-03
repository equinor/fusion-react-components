import { FC } from 'react';
import { BreadcrumbItemProps } from '../types';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      breadcrumbLink: {
        color: 'inherit',
        '&:hover': {
          cursor: 'pointer',
          textDecoration: 'underline',
          color: (props: { hasHoverColor: boolean }) =>
            props.hasHoverColor ? theme.colors.interactive.primary__resting.getVariable('color') : 'inherit',
        },
      },
    }),
  { name: 'fusion-breadcrumb-item' },
);

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ onClick, name, isActive, hasHoverColor }): JSX.Element => {
  const style = useStyles({ hasHoverColor });

  if (isActive) return <div>{name}</div>;
  return (
    // TODO
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onClick} className={style.breadcrumbLink}>
      {name}
    </div>
  );
};

export default BreadcrumbItem;
