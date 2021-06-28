import { FC, useEffect, useRef, useState } from 'react';
import {
  HangingGarden,
  GardenController,
  HangingGardenColumn,
  HeaderRenderContext,
  ItemRenderContext,
  PIXI,
  useHangingGardenErrorMessage,
  useHangingGardenData,
} from '@equinor/fusion-react-hanging-garden';
import { getStateColorHex } from './helpers';
import { fetchGardenItemsAsync, getColumns, getYearAndWeekFromDate } from './columns/columns';
import ProjectPopover from './components/project-popover';
import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';

import { useCallback } from 'react';
import GardenItem from './models/garden-item';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';

const useStyles = makeStyles<FusionTheme, { height?: number }>(() =>
  createStyles({
    root: ({ height }) => ({
      height,
      display: 'flex',
      flex: '1 1 auto',
      minWidth: 0,
    }),
  })
);

export type GardenDemoProps = {
  rows?: number;
  height?: number;
};

const GardenDemo: FC<GardenDemoProps> = ({ rows, height }: GardenDemoProps) => {
  const getData = useCallback(async () => {
    return (await fetchGardenItemsAsync(rows)) as Promise<HttpResponse<GardenItem[]>>;
  }, [rows]);

  const { data, error, isFetching, retry } = useHangingGardenData<GardenItem>(getData);

  const { errorMessage } = useHangingGardenErrorMessage('Garden items', error, retry);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<GardenItem | null>(null);
  const [columns, setColumns] = useState<HangingGardenColumn<GardenItem>[]>([]);
  const highlightedKey = getYearAndWeekFromDate(new Date());

  useEffect(() => {
    console.log('data', data);
    setColumns(getColumns(data));
  }, [data]);

  useEffect(() => {
    console.log('errorMessage', errorMessage);
  }, [errorMessage]);

  const style = useStyles({ height });

  const getItemWidth = () => {
    const longestKey = Math.max(...data.map((item) => item.id.length));

    return Math.max(longestKey * 8 + 35, 102);
  };

  const renderItem = (item: GardenItem, context: ItemRenderContext) => {
    context.createRect({ x: 0, y: 0 }, { width: context.width, height: context.height }, getStateColorHex(item.state));
    context.enquedRender(item.id, (context) => {
      const textNode = context.createTextNode(item.id, item.state === 'closed' ? 0xffffff : 0x212121);
      context.graphics.addChild(textNode);
      textNode.x = 20;
      textNode.y = context.height / 2 - textNode.height / 2;
    });

    context.addDot(0xffffff, { x: context.width - 12, y: 8 });

    context.addPopover(new PIXI.Rectangle(0, 0, context.width / 2, context.height), () => (
      <ProjectPopover text={`Left hover for item ${item.id}`} />
    ));

    context.addPopover(new PIXI.Rectangle(context.width / 2, 0, context.width / 2, context.height), () => (
      <ProjectPopover text={`Right hover for item ${item.id}`} />
    ));
  };

  const renderHeader = (key: string, context: HeaderRenderContext) => {
    const textNode = context.createTextNode(
      context.isExpanded ? key + ' Expanded' || 'NA Expanded' : key || 'NA',
      context.isHighlighted ? 0xffffff : 0x212121
    );

    context.container.addChild(textNode);
    textNode.x = context.width / 2 - textNode.width / 2;
    textNode.y = textNode.height / 2;
  };

  const gardenController = useRef<GardenController>(null);

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {!isFetching && Boolean(data.length) && (
        <div className={style.root}>
          <HangingGarden<GardenItem>
            columns={columns}
            highlightedColumnKey={highlightedKey}
            highlightedItem={selectedWorkOrder}
            itemKeyProp={'id'}
            itemWidth={getItemWidth()}
            itemHeight={24}
            renderItemContext={renderItem}
            getItemDescription={(item: GardenItem) => item.description}
            onItemClick={(item: GardenItem) => setSelectedWorkOrder(item)}
            headerHeight={40}
            renderHeaderContext={renderHeader}
            provideController={gardenController}
          />
        </div>
      )}
    </>
  );
};

export default GardenDemo;
