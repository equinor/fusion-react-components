import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import Icon from '../../../../../Icon';
import { arrow_forward } from '@equinor/eds-icons';

import { FC } from 'react';

type FilterSelectorMinimizedProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    FilterSelectorMinimizedContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '48px',
      height: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      borderRight: `solid 1px ${theme.colors.ui.background__medium.value.hex}`,
      cursor: 'pointer',
    },
  })
);

const FilterSelectorMinimized: FC<FilterSelectorMinimizedProps> = ({ setShow }) => {
  const styles = useStyles();
  return (
    <div onClick={() => setShow(true)} className={styles.FilterSelectorMinimizedContainer}>
      <Icon icon={arrow_forward} />
    </div>
  );
};

export default FilterSelectorMinimized;
