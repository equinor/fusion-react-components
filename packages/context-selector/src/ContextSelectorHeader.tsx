import { useCallback, useEffect, useState } from 'react';
import { ContextProvider } from './ContextProvider';
import { ContextSelector } from './ContextSelector';
import { ContextProviderProps, ContextSelectorProps, ContextResultItem, ContextSelectEvent } from './types';
import { Icon } from '@equinor/fusion-react-icon/src';
import { createStyles, makeStyles, clsx } from '@equinor/fusion-react-styles';

export type ContextHeaderProps = ContextProviderProps & ContextSelectorProps & { onClearContext: (e: Event) => void };

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        fontFamily: 'var(--fwc-typography-font-family)',
        width: '98%',
        maxWidth: '420px',
        height: '350px',
        margin: '0 auto',
        color: theme.colors.text.static_icons__default.getVariable('color'),
      },
      icon: {
        width: '10%',
        fontWeight: 400,
      },
      closeBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        background: 'none',
        border: '1px solid transparent',
        borderRadius: 'var(--mdc-shape-small, 4px)',
        color: theme.colors.interactive.primary__resting.getVariable('color'),
        '&:hover': {
          borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
        },
      },
      context: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      titleBlock: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: '0.9em',
        border: '1px solid transparent',
        borderRadius: 'var(--mdc-shape-small, 4px)',
        padding: '0.25em',
        '&:hover': {
          borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
        },
      },
      title: {
        fontSize: '1em',
        fontWeight: 'bold',
      },
      subTitle: {
        fontSize: '0.8em',
        fontStyle: 'italic',
      },
    }),
  { name: 'fusion-header-context-selector' }
);

export const ContextSelectorHeader = ({
  children,
  resolver,
  onSelect,
  ...props
}: React.PropsWithChildren<ContextHeaderProps>): JSX.Element => {
  const initialItem: ContextResultItem = {
    id: Date.now() + '',
    title: 'Select a Context',
    subTitle: 'Context',
    graphic: 'list',
    isDisabled: true,
  };

  const [ctx, setCtx] = useState<ContextResultItem | null>(initialItem);
  const [gettingCtx, setGettingCtx] = useState<boolean>(false);

  const styles = useStyles();

  /* Extend onSelect and calls props.onSelect */
  const handleSelect = useCallback(
    (selected: ContextSelectEvent) => {
      const item: ContextResultItem | undefined = selected.nativeEvent.detail.selected[0];
      setCtx(item);
      setGettingCtx(false);
      /* Trigger props.onSelect */
      if (onSelect) {
        onSelect(selected);
      }
    },
    [setCtx, onSelect]
  );

  /* Clear context button handler */
  const handleClearContext = useCallback(
    (event) => {
      console.log('EVENT', event);
      setCtx(null);
      if (props.onClearContext) {
        props.onClearContext(event);
      }
    },
    [setCtx, props]
  );

  /* extending the fwc-searchable-dropdown escape handler */
  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      console.log('Keyup event =>', e);
      if (e.key === 'Escape') {
        setGettingCtx(false);
      }

      if (
        (e.target as HTMLDivElement)?.className.indexOf('titleBlock') > 0 ||
        (e.target as HTMLDivElement)?.className.indexOf('closeBtn') > 0
      ) {
        if (e.key === ' ' || e.key === 'Enter') {
          setGettingCtx(true);
          e.stopPropagation();
          e.preventDefault();
          if ((e.target as HTMLDivElement)?.className.indexOf('closeBtn') > 0) {
            handleClearContext(e);
          }
        }
      }
    },
    [handleClearContext]
  );

  useEffect(() => {
    if (gettingCtx) {
      window.addEventListener('keyup', handleKeyup);
    }
    return () => {
      if (gettingCtx) {
        window.removeEventListener('keyup', handleKeyup);
      }
    };
  }, [gettingCtx, handleKeyup]);

  return (
    <div>
      <div className={styles.root}>
        {ctx && !gettingCtx ? (
          <div className={styles.context} onKeyUp={() => handleKeyup}>
            <div className={styles.icon}>{ctx.graphic && <Icon icon={ctx.graphic} />}</div>
            <div tabIndex={0} className={styles.titleBlock} onClick={() => setGettingCtx(true)}>
              <span className={styles.title}>{ctx.title}</span>
              <span className={styles.subTitle}>{ctx.subTitle}</span>
            </div>
            <div className={styles.icon}>
              {ctx && !ctx.isDisabled && (
                <button className={clsx(styles.closeBtn)} onClick={handleClearContext}>
                  <Icon icon="close" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <ContextProvider resolver={resolver}>
            <ContextSelector {...props} onSelect={handleSelect}>
              {children}
            </ContextSelector>
          </ContextProvider>
        )}
      </div>
    </div>
  );
};

export default ContextSelectorHeader;
