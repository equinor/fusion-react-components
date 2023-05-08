import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
const useErrorStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    messageContainer: {
      textAlign: 'center',
      color: 'var(--color-primary-accent)',
    },
    icon: {
      color: 'rgb(102, 102, 102)',
      fontSize: 36,
      margiBottom: '1em',
    },
    title: {
      fontSize: 28,
      margin: '1em 0',
    },
    message: {
      fontSize: 20,
    },
  })
);

export default useErrorStyles;
