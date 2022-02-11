import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItemProps } from '../types';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  () =>
    createStyles({
      breadcrumbLink: {
        color: 'inherit',
      },
    }),
  { name: 'fusion-breadcrumb-item' }
);

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ link, name, isActive }): JSX.Element => {
  const style = useStyles();

  if (!link || isActive) return <div className={style.breadcrumbLink}>{name}</div>;
  return (
    <Link to={link} className={style.breadcrumbLink}>
      {name}
    </Link>
  );
};

export default BreadcrumbItem;
