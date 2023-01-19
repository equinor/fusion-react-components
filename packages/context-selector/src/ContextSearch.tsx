import { useCallback, useEffect, useState } from 'react';
import { ContextSelector } from './ContextSelector';
import { ContextSelectorProps, ContextResultItem, ContextSelectEvent } from './types';
import { Icon } from '@equinor/fusion-react-icon';
import { useStyles } from './ContextSearchStyles';
import { clsx } from '@equinor/fusion-react-styles';

export type ContextSearchProps = ContextSelectorProps & {
  previewItem?: ContextResultItem;
  onClearContext?: (e: Event) => void;
};

const defaultInitialItem: ContextResultItem = {
  id: 'temp-dev-id',
  title: 'Select Context',
  subTitle: 'Context',
  graphic: 'list',
  isDisabled: true,
};

export const ContextSearch = ({
  children,
  onSelect,
  previewItem,
  onClearContext,
  ...props
}: React.PropsWithChildren<ContextSearchProps>): JSX.Element => {
  const initialItem = previewItem ? Object.assign(defaultInitialItem, previewItem) : defaultInitialItem;

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
      setCtx(initialItem);
      /* Trigger props.onClearContext */
      if (onClearContext) {
        onClearContext(event);
      }
    },
    [initialItem, onClearContext]
  );

  /* extending the fwc-searchable-dropdown escape handler */
  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGettingCtx(false);
      }

      if (e.key === ' ' || e.key === 'Enter') {
        if ((e.target as HTMLDivElement)?.className.indexOf('titleBlock') > 0) {
          setGettingCtx(true);
        } else if ((e.target as HTMLButtonElement)?.className.indexOf('closeBtn') > 0) {
          handleClearContext(e);
        }
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [handleClearContext]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyup]);

  return (
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
        <ContextSelector {...props} onSelect={handleSelect}>
          {children}
        </ContextSelector>
      )}
    </div>
  );
};

export default ContextSearch;
