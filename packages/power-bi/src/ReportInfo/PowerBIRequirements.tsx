import { FC } from 'react';

import { useSelector } from '@equinor/fusion/lib/epic';

import { Store } from './store/store';
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

// TODO use theme
export const useStyles = makeStyles(
  createStyles({
    root: {
      backgroundColor: 'var(--color-white)',
      width: '100%',
      margin: 'calc(var(--grid-unit) * 2px)',
    },
  }),
  { name: 'fusion-power-bi_requirements' }
);

// TODO add accordion
// TODO add markdown viewer
export const PowerBIInfoRequirements: FC<{ store: Store }> = ({ store }) => {
  const requirements = useSelector(store, 'requirements');
  // const [open, setOpen] = useState<boolean>();
  const styles = useStyles();
  return requirements ? (
    <div className={styles.root}>
      {/* <Accordion> */}
      {/* <AccordionItem label={'Access control description'} isOpen={open} onChange={() => setOpen(!open)}> */}
      <div>
        <span style={{ color: 'red' }}> missing element MarkdownViewer</span>
        {/* <MarkdownViewer markdown={requirements} /> */}
        {requirements}
      </div>
      {/* </AccordionItem> */}
      {/* </Accordion> */}
    </div>
  ) : null;
};

export default PowerBIInfoRequirements;
