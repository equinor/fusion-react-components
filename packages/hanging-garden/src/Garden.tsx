import { type RefObject, useEffect, useCallback, type UIEvent, type ReactElement } from 'react';
import { HangingGardenColumnIndex, HangingGardenColumn, GardenController } from './models/HangingGarden';
import { getCalculatedWidth, getCalculatedHeight, GROUP_LEVEL_OFFSET } from './utils';
import { useHangingGardenContext } from './renderHooks/useHangingGardenContext';
import useGarden from './renderHooks/useGarden';
import useRendererSize from './renderHooks/useRendererSize';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

type StyleProps = {
  wrapper: {
    height: number;
    width: number;
  };
};
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
      scrollbarGutter: 'stable',
      position: 'relative',
    },
    wrapper: ({ wrapper }: StyleProps) => ({
      minWidth: '100%',
      minHeight: '100%',
      ...wrapper,
    }),
  }),
);

type GardenProps = {
  readonly provideController?: RefObject<GardenController | null>;
};

const Garden = <T extends HangingGardenColumnIndex>({ provideController }: GardenProps): ReactElement => {
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
    groupLevels,
    padding,
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
    [renderGarden, onScroll],
  );

  const style = useStyles({
    wrapper: {
      width: getCalculatedWidth(
        expandedColumns,
        (columns as HangingGardenColumn<T>[]).length,
        itemWidth + padding + groupLevels * GROUP_LEVEL_OFFSET,
      ),
      height: getCalculatedHeight(headerHeight, itemHeight + padding, maxRowCount),
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
};

export default Garden;
