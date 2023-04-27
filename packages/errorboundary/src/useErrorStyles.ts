import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
const useErrorStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    messageContainer: {
      position: 'relative',
      left: '0',
      bottom: '0',
      right: '0',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: 'calc(var(--grid-unit) * 15px)',
      zIndex: '999',
    },
    title: {
      paddingTop: 'calc(var(--grid-unit) * 6px)',
      fontSize: '28px',
      height: 'calc(var(--grid-unit) * 4px)',
      overflow: 'hidden',
    },
    message: {
      fontSize: '20px',
      paddingBottom: 'calc(var(--grid-unit) * 5px)',
      paddingTop: 'calc(var(--grid-unit) * 3px)',
      height: 'auto',
      textAlign: 'center',
    },
  })
);

export default useErrorStyles;
