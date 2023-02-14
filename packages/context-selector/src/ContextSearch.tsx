import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@equinor/fusion-react-icon';
import { clsx } from '@equinor/fusion-react-styles';
import { ContextSelector } from './ContextSelector';
import { ContextSelectorProps, ContextResultItem, ContextSelectEvent } from './types';
import { useStyles } from './ContextSearch.styles';
import { SearchableDropdownElement } from '@equinor/fusion-wc-searchable-dropdown';

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
  const initialItem = previewItem ?? defaultInitialItem;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [ctx, setCtx] = useState<ContextResultItem | null>(initialItem);
  const [gettingCtx, setGettingCtx] = useState<boolean>(false);
  const styles = useStyles();
  const [sdd, setSdd] = useState<SearchableDropdownElement | null>(null);

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
      setCtx(defaultInitialItem);

      /* Clean SearchableDropdown */
      if (sdd) {
        sdd.controller.closeClick(new Event('click') as MouseEvent);
      }

      /* Trigger props.onClearContext */
      if (onClearContext) {
        onClearContext(event);
      }
    },
    [onClearContext, sdd]
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

  useEffect(() => {
    const ref = elementRef.current;
    if (ref) {
      // reference to web element
      setSdd(ref.querySelector('fwc-searchable-dropdown'));

      ref.addEventListener('dropdownClosed', () => {
        setGettingCtx(false);
      });
      /* close selector on click outside  */
      document.documentElement.addEventListener('click', (e: MouseEvent) => {
        if ((e.target as HTMLElement).contains(elementRef.current)) {
          setGettingCtx(false);
        }
      });
    }

    return () => {
      if (ref) {
        ref.removeEventListener('dropdownClosed', () => null);
      }
    };
  }, [elementRef, sdd]);

  useEffect(() => {
    if (sdd && gettingCtx) {
      sdd.focus();
    }
  }, [gettingCtx, sdd]);

  return (
    <div ref={elementRef} className={styles.root}>
      <div className={clsx(gettingCtx && styles.hidden)}>
        <div className={styles.context} onKeyUp={() => handleKeyup}>
          <div className={styles.icon}>{ctx?.graphic && <Icon icon={ctx.graphic} />}</div>
          <div tabIndex={0} className={styles.titleBlock} onClick={() => setGettingCtx(true)}>
            <span className={styles.title}>{ctx?.title}</span>
            <span className={styles.subTitle}>{ctx?.subTitle}</span>
          </div>
          <div className={styles.icon}>
            {ctx && !ctx.isDisabled && (
              <button className={clsx(styles.closeBtn)} onClick={handleClearContext}>
                <Icon icon="close" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={clsx(styles.ctxSelector, !gettingCtx ? styles.hidden : 'active')}>
        <ContextSelector {...props} onSelect={handleSelect}>
          {children}
        </ContextSelector>
      </div>
    </div>
  );
};

export default ContextSearch;
