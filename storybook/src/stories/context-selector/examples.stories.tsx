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
  () =>
    createStyles({
      root: {
        fontFamily: 'Equinor',
        width: '98%',
        maxWidth: '420px',
        height: '350px',
        margin: '0 auto',
      },
      icon: {
        width: '10%',
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
        fontSize: '16px',
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
  const initialItem = {
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

  useEffect(() => {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      console.log('KEY PRESSED', e.key);
      if (e.key === 'Escape') {
        setGettingCtx(false);
      }
    });
  }, [setGettingCtx]);

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
              <Button
                className={styles.icon}
                variant="ghost"
                dense={true}
                icon="close"
                onClick={() => {
                  setCtx(undefined);
                  setGettingCtx(true);
                }}
              />
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
