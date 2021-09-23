import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useChangeLogStyles = makeStyles(
  createStyles({
    header: {
      fontSize: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,112,255,.05)',
      boxShadow: '2px 5px 7px 0px rgb(0 0 0 / 15%)',
      margin: '2rem 0',
      '& > svg': {
        height: '2em',
      },
    },
    changelog: {
      '& h1': {
        fontSize: 18,
      },
      '& h2': {
        fontSize: 16,
      },
      '& h3': {
        fontSize: 14,
        margin: '8px 0px',
      },
      '& #change-log': {
        display: 'none',
      },
      '& #features  + ul > li, & #bug-fixes  + ul > li': {
        display: 'inline-flex',
      },

      '& #bug-fixes + ul, & #features + ul': {
        margin: 0,
        padding: 0,
      },

      '& #bug-fixes  + ul, & #features  + ul': {
        display: 'flex',
        flexFlow: 'column',
      },

      '& #bug-fixes  + ul > li, & #features  + ul > li': {
        display: 'inline-flex',
      },

      '& #bug-fixes + ul > li::before': {
        content: '"🐞"',
        display: 'block',
        marginRight: '.5em',
      },

      '& #features + ul > li::before': {
        content: '"🚀"',
        display: 'block',
        marginRight: '.5em',
      },
    },
  })
);

export default useChangeLogStyles;
