import type { ReactElement, PropsWithChildren, HTMLAttributes } from 'react';
import { clsx, createStyles, makeStyles, type theme } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: ({ spacing }: StyleProps) => ({
        display: 'inline-flex',
        flex: 'auto',
        gap: theme.spacing.comfortable[spacing || 'medium'].getVariable('padding'),
        '&>*': {
          flex: 1,
        },
      }),
    }),
  { name: 'fusion-filter-container' },
);

type StyleProps = {
  readonly spacing?: keyof typeof theme.spacing.comfortable;
};

export type FilterContainerProps = HTMLAttributes<HTMLDivElement> & StyleProps;

/**
 *  Components for displaying filters
 */
export const FilterContainer = (props: PropsWithChildren<FilterContainerProps>): ReactElement => {
  const { children, className, spacing, ...args } = props;
  const styles = useStyles({ spacing });
  return (
    <div className={clsx(styles.root, className)} {...args}>
      {children}
    </div>
  );
};

export default FilterContainer;
