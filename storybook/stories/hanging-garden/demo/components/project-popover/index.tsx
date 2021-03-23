import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

type ProjectPopoverType = {
  text: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      whiteSpace: 'nowrap'
    },
  })
);

const ProjectPopover: React.FC<ProjectPopoverType> = ({ text }) => {
  const styles = useStyles();
  return <div className={styles.root}>{text}</div>;
};

export default ProjectPopover;
