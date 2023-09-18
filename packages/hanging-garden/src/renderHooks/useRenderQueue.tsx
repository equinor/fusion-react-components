import * as React from 'react';
import * as PIXI from 'pixi.js-legacy';
import { useHangingGardenContext } from './useHangingGardenContext';
import { ItemRenderContext, RenderItem } from '..';

export type RenderQueue = {
  enqueueRenderer: (key: string, render: (context: ItemRenderContext) => void, context: ItemRenderContext) => void;
  processRenderQueue: () => void;
  processRenderQueueAnimationFrame: React.MutableRefObject<number>;
};

/**
 * A queue for all items the renderGarden creates that needs to be rendered.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useRenderQueue = (): RenderQueue => {
  const {
    pixiApp,
    itemWidth,
    padding,
    textureCaches: { getTextureFromCache, addTextureToCache },
  } = useHangingGardenContext();

  const renderQueue = React.useRef<RenderItem[]>([]);
  const isRendering = React.useRef(false);

  const processRenderQueueAnimationFrame = React.useRef(0);

  const enqueueRenderer = React.useCallback(
    (key: string, render: (context: ItemRenderContext) => void, context: ItemRenderContext) => {
      renderQueue.current.push({
        key,
        render,
        context,
      });
      processRenderQueue();
    },
    [renderQueue.current],
  );

  const processRenderQueue = React.useCallback(async () => {
    if (isRendering.current || !renderQueue.current.length) return;

    const queueLength = 50;
    const renderers = renderQueue.current.splice(0, queueLength);

    isRendering.current = true;

    Promise.all(renderers.map(processRenderer)).then(() => {
      if (!renderQueue.current.length) {
        pixiApp.current?.render();
      }
      isRendering.current = false;
      window.requestAnimationFrame(processRenderQueue);
    });
  }, [isRendering, pixiApp, renderQueue]);

  const processRenderer = React.useCallback(
    async (renderer: RenderItem) => {
      let graphicsContainer = getTextureFromCache('graphics', renderer.key) as PIXI.RenderTexture;

      if (!graphicsContainer || graphicsContainer.width !== itemWidth + padding) {
        const graphics = new PIXI.Graphics();
        graphics.cacheAsBitmap = false;
        renderer.render({
          ...renderer.context,
          graphics,
        });

        graphicsContainer = PIXI.RenderTexture.create({
          width: renderer.context.width,
          height: renderer.context.height,
        });
        pixiApp.current?.renderer.render(graphics, graphicsContainer);
        addTextureToCache('graphics', renderer.key, graphicsContainer);
      }

      renderer.context.container.addChild(new PIXI.Sprite(graphicsContainer));
    },
    [getTextureFromCache, addTextureToCache, pixiApp, itemWidth],
  );

  return { enqueueRenderer, processRenderQueue, processRenderQueueAnimationFrame };
};

export default useRenderQueue;
