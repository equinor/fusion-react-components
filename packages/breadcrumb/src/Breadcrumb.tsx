import { FC } from 'react';
import BreadcrumbItem from './components/BreadcrumbItem';
import Divider from './components/Divider';
import { BreadcrumbItemProps as ItemProps, BreadcrumbProps as Props } from './types';
import Skeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const generateLevelBasedArray = (level?: number): BreadcrumbItemProps[] =>
  Array.from(Array((level || 0) + 1)).map((_, i) => ({
    name: i.toString(),
  }));

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      breadcrumbContainer: {
        ...theme.typography.navigation.breadcrumb.style,
        color: 'inherit',
        display: 'flex',
      },
      crumb: {
        display: 'flex',
      },
    }),
  { name: 'fusion-breadcrumb' }
);

export const Breadcrumb: FC<Props> = ({ breadcrumbs, isFetching, currentLevel, hasHoverColor = true }): JSX.Element => {
  const style = useStyles();
  const levelArray = generateLevelBasedArray(currentLevel);

  return (
    <div className={style.breadcrumbContainer}>
      {(isFetching ? levelArray : breadcrumbs)?.map((crumb: ItemProps, index: number, array: ItemProps[]) => {
        const lastCrumb = array.length - 1 === index;
        return (
          <div className={style.crumb} key={`${crumb.name}-${index.toString()}`}>
            {isFetching ? (
              <Skeleton variant={SkeletonVariant.Text} size={SkeletonSize.XSmall} />
            ) : (
              <BreadcrumbItem
                onClick={crumb.onClick}
                name={crumb.name}
                isActive={crumb.isActive || lastCrumb}
                hasHoverColor={hasHoverColor}
              />
            )}
            {!lastCrumb && <Divider />}
          </div>
        );
      })}
    </div>
  );
};

export type BreadcrumbItemProps = React.ComponentProps<typeof BreadcrumbItem>;

export type BreadcrumbProps = React.ComponentProps<typeof Breadcrumb>;

export default Breadcrumb;
