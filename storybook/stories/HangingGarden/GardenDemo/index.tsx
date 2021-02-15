import { FC, useEffect, useRef, useState } from 'react';
import {
  HangingGarden,
  GardenController,
  HangingGardenColumn,
  HeaderRenderContext,
  ItemRenderContext,
  PIXI,
  useHangingGardenData,
  useHangingGardenErrorMessage,
} from '@equinor/fusion-react-hanging-garden';
import WorkOrderType from './models/WorkOrderType';
import { followUpColorMapHex, getFollowUpStatus, getMatStatusColor } from './helpers';
import { getColumns, getYearAndWeekFromDate } from './columns/columns';
import ProjectPopover from './components/ProjectPopover';
import styled from 'styled-components';

export const getItemSearchableValues = (workOrder: WorkOrderType): WorkOrderType => ({
  ...workOrder,
  searchableValues:
    workOrder.workOrderNumber +
    workOrder.description +
    workOrder.responsible +
    workOrder.materialStatus +
    workOrder.materialComments +
    workOrder.constructionComments,
});

export const SortWorkOrdersByFilterTerms = (workorders: WorkOrderType[]) =>
  workorders.sort((a, b) => (parseInt(a.projectProgress) || 0) - (parseInt(b.projectProgress) || 0));

const HangingGardenContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 500px;
  min-width: 0;
`;

const GardenDemo: FC = () => {
  const { data, error, isFetching, retry, invalidate, cacheIsInvalid, cacheAge } = useHangingGardenData(
    'dataProxy',
    'getWorkOrdersAsync',
    SortWorkOrdersByFilterTerms,
    getItemSearchableValues
  );

  const { errorMessage } = useHangingGardenErrorMessage('handover', error, retry);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrderType | null>(null);
  const [columns, setColumns] = useState<HangingGardenColumn<WorkOrderType>[]>([]);
  const highlightedKey = getYearAndWeekFromDate(new Date());

  useEffect(() => {
    setColumns(getColumns(data));
  }, [data]);

  const getItemWidth = () => {
    const longestKey = Math.max.apply(
      Math,
      data.map((workOrder) => workOrder.workOrderNumber.length)
    );

    return Math.max(longestKey * 8 + 35, 102);
  };

  const renderItem = (item: WorkOrderType, context: ItemRenderContext) => {
    const status = getFollowUpStatus(item);

    context.createRect({ x: 0, y: 0 }, { width: context.width, height: context.height }, followUpColorMapHex[status]);
    context.enquedRender(item.workOrderNumber, (context) => {
      const textNode = context.createTextNode(
        item.workOrderNumber,
        status === 'MaterialAndWoAvailable' ? 0x212121 : 0xffffff
      );
      context.graphics.addChild(textNode);
      textNode.x = 20;
      textNode.y = context.height / 2 - textNode.height / 2;
    });

    context.addDot(getMatStatusColor(item), { x: context.width - 12, y: 8 });
    context.addPopover(new PIXI.Rectangle(0, 0, context.width, context.height), () => <ProjectPopover item={item} />);
  };

  const renderHeader = (key: string, context: HeaderRenderContext) => {
    const textNode = context.createTextNode(
      context.isExpanded ? key + ' Expanded' || 'NA Expanded' : key || 'NA',
      context.isHighlighted ? 0xffffff : 0x243746
    );

    context.container.addChild(textNode);
    textNode.x = context.width / 2 - textNode.width / 2;
    textNode.y = textNode.height / 2;
  };

  const gardenController = useRef<GardenController>(null);

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {!isFetching && data.length && (
        <HangingGardenContainer>
          <HangingGarden<WorkOrderType>
            columns={columns}
            highlightedColumnKey={highlightedKey}
            highlightedItem={selectedWorkOrder}
            itemKeyProp={'workOrderId'}
            itemWidth={getItemWidth()}
            itemHeight={24}
            renderItemContext={renderItem}
            getItemDescription={(item: WorkOrderType) => item.description}
            onItemClick={(item: WorkOrderType) => setSelectedWorkOrder(item)}
            headerHeight={40}
            renderHeaderContext={renderHeader}
            provideController={gardenController}
          />
        </HangingGardenContainer>
      )}
    </>
  );
};

export default GardenDemo;
