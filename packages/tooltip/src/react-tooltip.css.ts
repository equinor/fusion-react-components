export default {
  '@global': {
    '.tippy-box[data-animation=fade][data-state=hidden]': {
      opacity: 0,
    },
    '.tippy-box[data-tippy-root]': {
      maxWidth: 'calc(100vw - 10px)',
    },
    '.tippy-box': {
      position: 'relative',
      backgroundColor: '#333',
      color: '#fff',
      whiteSpace: 'normal',
      outline: 0,
      transitionProperty: 'transform,visibility,opacity',
    },
    '.tippy-box[data-placement^=top] > .tippy-arrow': {
      bottom: 0,
    },
    '.tippy-box[data-placement^=top] > .tippy-arrow::before': {
      bottom: '-7px',
      left: 0,
      borderWidth: '8px 8px 0',
      borderTopColor: 'initial',
      transformOrigin: 'center top',
    },
    '.tippy-box[data-placement^=bottom] > .tippy-arrow': {
      top: 0,
    },
    '.tippy-box[data-placement^=bottom] > .tippy-arrow::before': {
      top: '-7px',
      left: 0,
      borderWidth: '0 8px 8px',
      borderBottomColor: 'initial',
      transformOrigin: 'center bottom',
    },
    '.tippy-box[data-placement^=left] > .tippy-arrow': {
      right: 0,
    },
    '.tippy-box[data-placement^=left] > .tippy-arrow::before': {
      borderWidth: '8px 0 8px 8px',
      borderLeftColor: 'initial',
      right: '-7px',
      transformOrigin: 'center left',
    },
    '.tippy-box[data-placement^=right] > .tippy-arrow': {
      left: 0,
    },
    '.tippy-box[data-placement^=right] > .tippy-arrow::before': {
      left: '-7px',
      borderWidth: '8px 8px 8px 0',
      borderRightColor: 'initial',
      transformOrigin: 'center right',
    },
    '.tippy-box[data-inertia][data-state=visible]': {
      transitionTimingFunction: 'cubic-bezier(.54,1.5,.38,1.11)',
    },
    '.tippy-arrow': {
      width: '16px',
      height: '16px',
      color: '#333',
    },
    '.tippy-arrow::before': {
      content: '""',
      position: 'absolute',
      borderColor: 'transparent',
      borderStyle: 'solid',
    },
    '.tippy-content': {
      position: 'relative',
      padding: '9px',
      zIndex: '1',
    },
  },
};
