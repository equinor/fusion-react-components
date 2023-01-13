import React, { useState, useCallback, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ContextSelector,
  ContextSelectorHeader,
  ContextHeaderProps,
  ContextSelectEvent,
  ContextResultItem,
} from '@equinor/fusion-react-context-selector/src';
import { Icon } from '@equinor/fusion-react-icon/src';
import { Button } from '@equinor/fusion-react-button/src';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

import { _exampleResolver } from './component.helpers';

export default {
  title: 'Examples/ContextSelector',
  component: ContextSelector,
} as Meta;

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
      },
      title: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
      subTitle: {
        fontSize: '12px',
        fontStyle: 'italic',
      },
    }),
  { name: 'fusion-header-context-selector' }
);

export const ContextHeader: Story<ContextHeaderProps> = ({
  children,
  ...props
}: React.PropsWithChildren<ContextHeaderProps>) => {
  const initialItem: ContextResultItem = {
    id: Date.now() + '',
    title: 'Select a Context',
    subTitle: 'Context',
    graphic: 'list',
    isDisabled: true,
  };

  const [ctx, setCtx] = useState<ContextResultItem | undefined>(initialItem);
  const [gettingCtx, setGettingCtx] = useState<boolean>(false);

  const styles = useStyles();

  const handleSelect = useCallback(
    (selected: ContextSelectEvent) => {
      const item: ContextResultItem | undefined = selected.nativeEvent.detail.selected.pop();
      console.log('SELECTED', item);
      setCtx(item);
      setGettingCtx(false);
    },
    [setCtx]
  );

  // extending the fwc-searchable-dropdown escape handler
  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGettingCtx(false);
      }
    },
    [setGettingCtx]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  });

  return (
    <div>
      <div className={styles.root}>
        {ctx && !gettingCtx ? (
          <div className={styles.context}>
            <div className={styles.icon}>{ctx.graphic && <Icon icon={ctx.graphic} />}</div>
            <div className={styles.titleBlock} onClick={() => setGettingCtx(true)}>
              <span className={styles.title}>{ctx.title}</span>
              <span className={styles.subTitle}>{ctx.subTitle}</span>
            </div>
            <div className={styles.icon}>
              {ctx && !ctx.isDisabled && (
                <Button
                  className={styles.icon}
                  variant="ghost"
                  dense={true}
                  color="secondary"
                  icon="close"
                  onClick={() => {
                    setCtx(undefined);
                    setGettingCtx(true);
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <ContextSelectorHeader {...props} onSelect={handleSelect}>
            {children}
          </ContextSelectorHeader>
        )}
      </div>
    </div>
  );
};
ContextHeader.args = {
  placeholder: 'Start to type to search...',
  initialText: 'The initial text result',
  id: 'sdd-test',
  variant: 'header',
  dropdownHeight: '300px',
  resolver: _exampleResolver,
};
