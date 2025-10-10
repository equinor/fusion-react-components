import {
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { ContextSelector } from './ContextSelector';
import type { ContextSelectorProps, ContextResultItem, ContextSelectEvent } from './types';
import { useStyles } from './ContextSearch.styles';
import type { SearchableDropdownElement } from '@equinor/fusion-wc-searchable-dropdown';

import { IconElement } from '@equinor/fusion-wc-icon';
IconElement;

const ContextClearEventType = 'ctx-selector-clear';
interface ContextClearEventDetails {
  date?: number;
}
export class ContextClearEvent extends CustomEvent<ContextClearEventDetails> {
  static readonly eventName = ContextClearEventType;
  constructor(options: ContextClearEventDetails) {
    super(ContextClearEvent.eventName, {
      bubbles: true,
      cancelable: true,
      detail: options,
    });
  }
}

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
}: PropsWithChildren<ContextSearchProps>): ReactElement => {
  const initialItem = previewItem ?? defaultInitialItem;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [ctx, setCtx] = useState<ContextResultItem | null>(initialItem);
  const [gettingCtx, setGettingCtx] = useState<boolean>(false);
  const styles = useStyles();
  const [sdd, setSdd] = useState<SearchableDropdownElement | null>(null);

  useMemo(() => {
    if (previewItem) {
      setCtx(previewItem);
    }
  }, [previewItem]);

  const toggleGettingCtx = useCallback(() => {
    setGettingCtx(!gettingCtx);
  }, [gettingCtx]);

  const keyUpGettingCtx = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleGettingCtx();
      }
    },
    [toggleGettingCtx],
  );

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
    [onSelect],
  );

  /* Clear context button handler */
  const handleClearContext = useCallback(
    (event: any) => {
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
    [onClearContext, sdd],
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
    [handleClearContext],
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyup]);

  useEffect(() => {
    if (elementRef.current) {
      // sets the fwc node
      setSdd(
        elementRef.current.querySelector<SearchableDropdownElement>('fwc-searchable-dropdown'),
      );
    }
  }, []);

  useEffect(() => {
    const ref = elementRef.current;
    if (ref) {
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
  }, []);

  /**
   * Add ctx-selector-clear event listener.
   * Used when triggering clear context outside component
   */
  useMemo(() => {
    const clearContextHandler = () => setCtx(defaultInitialItem);
    document.addEventListener(ContextClearEventType, clearContextHandler);
    return () => {
      document.removeEventListener(ContextClearEventType, clearContextHandler);
    };
  }, []);

  useEffect(() => {
    if (sdd && gettingCtx) {
      sdd.focus();
    }
  }, [gettingCtx, sdd]);

  return (
    <div ref={elementRef} className={styles.root}>
      <div className={clsx(gettingCtx && styles.hidden)}>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: will fix later */}
        <div className={styles.context} onKeyUp={() => handleKeyup}>
          {/* @ts-expect-error fwc-icon is a custom element */}
          <div className={styles.icon}>{ctx?.graphic && <fwc-icon icon={ctx.graphic} />}</div>
          {/** biome-ignore lint/a11y/noStaticElementInteractions: will fix later */}
          <div
            // biome-ignore lint/a11y/noNoninteractiveTabindex: will fix later
            tabIndex={0}
            className={styles.titleBlock}
            onClick={toggleGettingCtx}
            onKeyDown={(e) => keyUpGettingCtx(e)}
          >
            <span className={styles.title}>{ctx?.title}</span>
            <span className={styles.subTitle}>{ctx?.subTitle}</span>
          </div>
          <div className={styles.icon}>
            {ctx && !ctx.isDisabled && (
              <button type="button" className={clsx(styles.closeBtn)} onClick={handleClearContext}>
                {/* @ts-expect-error fwc-icon is a custom element */}
                <fwc-icon icon="close" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={clsx(styles.ctxSelector, !gettingCtx ? styles.hidden : 'active')}>
        {gettingCtx && (
          <ContextSelector autofocus={true} {...props} onSelect={handleSelect}>
            {children}
          </ContextSelector>
        )}
      </div>
    </div>
  );
};

export default ContextSearch;
