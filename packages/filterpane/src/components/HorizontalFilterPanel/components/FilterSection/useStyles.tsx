import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    FilterSectionContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    FilterSection: {
      display: 'flex',
      width: '100%',
      backgroundColor: theme.colors.ui.background__light.value.hex,
      boxSizing: 'border-box',
      borderBottom: `solid 1px ${theme.colors.ui.background__medium.value.hex}`,
      overflowY: 'auto',
    },

    FilterSectionEmptyText: {
      padding: '16px',
    },

    Resize: {
      width: '100%',
      zIndex: 2,
      height: '4px',
      left: '-16px',
      cursor: 'row-resize',
    },

    Resizing: {
      userSelect: 'none',
      transition: 'none',
    },

    ResizeBar: { width: '100%', position: 'relative', zIndex: 1, height: '4px' },

    ResizingBar: { background: ' rgba(0, 0, 0, 0.1)' },

    ResizeIndicator: {
      position: 'relative',
      left: '50%',
      top: '-14px',
      width: '24px',
      background: 'white',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      opacity: 1,
      transition: 'opacity 0.2s',
      zIndex: 2,
    },

    ResizingIndictor: { opacity: 1 },

    Minimized: {
      display: 'none',
    },
  })
);

export default useStyles;
