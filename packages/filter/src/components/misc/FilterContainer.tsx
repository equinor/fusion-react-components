import { clsx, createStyles, makeStyles, theme } from '@equinor/fusion-react-styles';
import React from 'react';

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

export type FilterContainerProps = JSX.IntrinsicElements['div'] & StyleProps;

/**
 *  Components for displaying filters
 */
export const FilterContainer = (props: React.PropsWithChildren<FilterContainerProps>): JSX.Element => {
  const { children, className, spacing, ...args } = props;
  const styles = useStyles({ spacing });
  return (
    <div className={clsx(styles.root, className)} {...args}>
      {children}
    </div>
  );
};

export default FilterContainer;
