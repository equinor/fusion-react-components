import { MutableRefObject, useEffect, useCallback, UIEvent } from 'react';
import { HangingGardenColumnIndex, HangingGardenColumn, GardenController } from './models/HangingGarden';
import { getCalculatedWidth, getCalculatedHeight } from './utils';
import { useHangingGardenContext } from './renderHooks/useHangingGardenContext';
import useGarden from './renderHooks/useGarden';
import useRendererSize from './renderHooks/useRendererSize';
import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';

type StyleProps = {
  wrapper: {
    height: number;
    width: number;
  };
};
const useStyles = makeStyles<FusionTheme, StyleProps>(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
      position: 'relative',
    },
    wrapper: ({ wrapper }) => ({
      minWidth: '100%',
      minHeight: '100%',
      ...wrapper,
    }),
  })
);

type GardenProps = {
  provideController?: MutableRefObject<GardenController | null>;
};

function Garden<T extends HangingGardenColumnIndex>({ provideController }: GardenProps): JSX.Element {
  const {
    pixiApp,
    container,
    canvas,
    maxRowCount,
    expandedColumns,
    columns,
    itemHeight,
    itemWidth,
    headerHeight,
    textureCaches: { clearTextureCaches, clearItemTextureCaches },
    scroll: { onScroll },
    popover: { popover },
  } = useHangingGardenContext();

  const { renderGarden } = useGarden();
  useRendererSize();

  useEffect(() => {
    if (!pixiApp.current) return;
    if (provideController) {
      provideController.current = {
        clearGarden: () => {
          clearTextureCaches();
          clearItemTextureCaches();
        },
      };
    }
  }, [pixiApp.current]);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      onScroll(e, renderGarden);
    },
    [renderGarden, onScroll]
  );

  const style = useStyles({
    wrapper: {
      width: getCalculatedWidth(expandedColumns, (columns as HangingGardenColumn<T>[]).length, itemWidth),
      height: getCalculatedHeight(headerHeight, itemHeight, maxRowCount),
    },
  });

  return (
    <div ref={container} onScroll={handleScroll} className={style.root}>
      <div className={style.wrapper}>
        <canvas ref={canvas} />
      </div>
      {popover}
    </div>
  );
}

export default Garden;
