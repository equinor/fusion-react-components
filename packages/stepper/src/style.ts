import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        '--content-resize': '1',
        '--badge-size': '21px',
        '--spacing': '7.5px',
        '--spacing-vertical': '5px',
        '--spacing-between-vartical-steps': theme.spacing.comfortable.x_large.getVariable('padding'),
        '--spacing-between-horizontal-steps': theme.spacing.comfortable.medium.getVariable('padding'),
      },
      /** Main Container */
      stepperContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      verticalStepperContainer: {
        flexDirection: 'row',
        width: '100%',
      },
      /** Stepper */
      stepper: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.comfortable.medium.getVariable('padding'),
        paddingBottom: theme.spacing.comfortable.medium.getVariable('padding'),
      },
      stepContent: {
        flex: '1',
      },
      /** Horizontal title stepper */
      horizontalTitleStepper: {
        '& $step': {
          flex: '1 1 auto',
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingRight: 'var(--spacing)',
          '&:not(:last-child):after': {
            flex: '1',
            order: '1',
            left: '0',
            width: 'calc(100% - var(--spacing))',
          },
        },
        '& $content': {
          paddingTop: '2px',
          textAlign: 'left',
        },
      },

      /** Vertical stepper */
      verticalStepper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRight: '1px solid',
        borderRightColor: theme.colors.interactive.disabled__border.getVariable('color'),
        paddingRight: theme.spacing.comfortable.medium.getVariable('padding'),
      },
      /** Navigation arrows */
      navigationArrows: {
        display: 'flex',
        flexWrap: 'nowrap',
        disabled: {
          color: theme.colors.text.static_icons__primary_white.getVariable('color'),
        },
      },
      navigationArrow: {},
      /** Step Pane */
      stepPaneWrapper: {
        flex: '1 1 auto',
      },
      stepPane: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      /** Vertical steps and vertical step */
      verticalSteps: {
        flexDirection: 'column',
        '& $step': {
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'flex-start',
          flex: '1 1',
          paddingBottom: 'var(--spacing-between-vartical-steps)',
          '&:not(:last-child):after': {
            content: "''",
            position: 'absolute',
            left: 'calc(var(--badge-size) / 2)',
            top: 'calc(var(--badge-size) + var(--spacing-vertical))',
            width: '1px',
            height: 'calc(100% - var(--badge-size) - calc(var(--spacing-vertical) * 2))',
          },
        },
        '& $content': {
          paddingTop: '1px',
          textAlign: 'left',
        },
      },
      /** Single step */
      step: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flex: '1 1 150px',
        '&:not(:last-child):after': {
          content: "''",
          position: 'relative',
          top: 'calc(var(--badge-size) / 2)',
          width: 'calc(100% - var(--badge-size) - calc(var(--spacing) * 2))',
          left: '50%',
          height: '1px',
          backgroundColor: theme.colors.interactive.disabled__border.getVariable('color'),
          order: ' -1',
        },
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 'calc(var(--spacing-between-horizontal-steps) / 2)',
        paddingRight: 'calc(var(--spacing-between-horizontal-steps) / 2)',
        paddingTop: theme.spacing.comfortable.small.getVariable('padding'),
        paddingBottom: theme.spacing.comfortable.small.getVariable('padding'),
        textAlign: 'center',
      },
      isClickable: {
        cursor: 'pointer',
      },
      doneStep: {
        '&:not(:last-child):after': {
          backgroundColor: theme.colors.interactive.primary__resting.getVariable('color'),
        },
      },
      /** Single step - badge */
      badge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--badge-size, 21px)',
        height: 'var(--badge-size, 21px)',
        color: theme.colors.text.static_icons__default.getVariable('color'),
        fontSize: `calc(${theme.typography.paragraph.caption.getVariable('fontSize')} * var(--content-resize, 1))`,
        fontWeight: 400,
        lineHeight: '1.2',
        border: '1px solid',
        borderColor: theme.colors.interactive.disabled__border.getVariable('color'),
        borderRadius: '50%',
      },
      done: {
        border: '1px solid',
        borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
        color: theme.colors.interactive.primary__resting.getVariable('color'),
      },
      active: {
        borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
        background: theme.colors.interactive.primary__resting.getVariable('color'),
        color: theme.colors.text.static_icons__primary_white.getVariable('color'),
      },
      /** Single step - Title */
      title: {
        fontSize: theme.typography.paragraph.body_long.getVariable('fontSize'),
        fontWeight: 400,
        lineHeight: 1.2,
        marginBottom: theme.spacing.comfortable.xx_small.getVariable('padding'),
        color: theme.colors.text.static_icons__default.getVariable('color'),
      },
      /** Single step - Description */
      description: {
        fontSize: theme.typography.paragraph.caption.getVariable('fontSize'),
        fontWeight: 400,
        color: theme.colors.text.static_icons__tertiary.getVariable('color'),
      },
      text: {},
      /** Disabled step */
      disabled: {
        pointerEvents: 'none',
        color: theme.colors.interactive.disabled__text.getVariable('color'),
        '--line-color': 'var(--color-black-alt3)',
        '& $title': {
          color: theme.colors.interactive.disabled__text.getVariable('color'),
        },
        '& $description': {
          color: theme.colors.interactive.disabled__text.getVariable('color'),
        },
        '& $badge': {
          color: theme.colors.interactive.disabled__text.getVariable('color'),
        },
        '&$current': {
          '& $active': {
            color: theme.colors.text.static_icons__primary_white.getVariable('color'),
          },
          // '&$step': {
          //   opacity: '0.7',
          // },
        },
        '&$doneStep': {
          '& $badge': {
            borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
            color: theme.colors.interactive.primary__resting.getVariable('color'),
          },
          '& $title ': {
            color: theme.colors.text.static_icons__default.getVariable('color'),
          },
          '& $description ': {
            color: theme.colors.text.static_icons__tertiary.getVariable('color'),
          },
        },
      },
      /** Current step */
      current: {
        '& $title ': {
          color: theme.colors.interactive.primary__resting.getVariable('color'),
          fontWeight: 700,
        },
        '& $description ': {
          color: theme.colors.interactive.primary__resting.getVariable('color'),
        },
      },
    }),
  { name: 'fusion-react-stepper' },
);

export default useStyles;
