//import { useAppSettings } from '@equinor/fusion';
import { useState, useCallback, useEffect, RefObject, useMemo } from 'react';
import useEventListener from './useEventListener';

interface ResizedSize {
  height: number;
}

export interface ResizablePaneOptions {
  id: string;
  isResizable?: boolean;
  minHeight?: number;
  maxHeight?: number;
  defaultHeight?: number;
  resizeContainerRef: RefObject<HTMLDivElement>;
}

export type ResizablePane = {
  onResizeStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  resizedSize: ResizedSize | null;
  isResizing: boolean;
};

const useResizablePanel = ({
  isResizable: isEnabled,
  id,
  defaultHeight,
  minHeight,
  maxHeight,
  resizeContainerRef,
}: ResizablePaneOptions): ResizablePane => {
  const resizeSettingsKey = `${id}Size`;
  //TODO: Appsettings didnt work. reimplement later
  // const [appSettings, setAppSettings] = useAppSettings();
  const [appSettings, setAppSettings] = useState<Record<string, ResizedSize>>({
    [resizeSettingsKey]: { height: defaultHeight || window.innerHeight * 0.4 },
  });
  const [isResizing, setIsResizing] = useState(false);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [resizedSize, setResizedSize] = useState<ResizedSize | null>({
    height: defaultHeight || window.innerHeight * 0.4,
  });

  const topOffset = useMemo(() => resizeContainerRef.current?.getBoundingClientRect().top || 0, [resizeContainerRef]);

  const windowHeight = useMemo(() => window.innerHeight - topOffset, [topOffset]);

  const onResizeStart = useCallback(() => {
    if (!isEnabled) return;

    setIsResizing(true);
    setMouseIsDown(true);
  }, [isEnabled]);

  const getConstrainedSize = useCallback(
    (size: ResizedSize): ResizedSize => {
      const { height } = size;

      const maxWindowHeight = windowHeight * 0.8;
      const actualMaxHeight = Math.min(maxHeight || maxWindowHeight, maxWindowHeight);
      const actualMinHeight = minHeight || 150;

      if (height > actualMaxHeight) return { height: actualMaxHeight };
      if (height < actualMinHeight) return { height: actualMinHeight };
      return size;
    },
    [maxHeight, minHeight, windowHeight]
  );

  const onResize = useCallback(
    (e) => {
      if (!isResizing || !mouseIsDown) return;

      const height = (e as MouseEvent).pageY - topOffset;
      const size = getConstrainedSize({ height });

      window.requestAnimationFrame(() => setResizedSize(size));
    },
    [getConstrainedSize, isResizing, mouseIsDown, topOffset]
  );

  const onResizeEnd = useCallback(() => {
    if (!isResizing) return;
    setMouseIsDown(false);
    setTimeout(() => setIsResizing(false));

    if (resizeSettingsKey && resizedSize) setAppSettings({ [resizeSettingsKey]: { ...resizedSize } }); //setAppSettings(resizeSettingsKey, resizedSize);
  }, [isResizing, resizeSettingsKey, resizedSize]);

  useEventListener(window, 'mousemove', onResize, [isResizing]);
  useEventListener(window, 'mouseup', onResizeEnd, [isResizing, onResizeEnd]);

  useEffect(() => {
    if (!isEnabled) return;

    const persistedSize = appSettings[resizeSettingsKey] as ResizedSize;
    if (!persistedSize?.height || persistedSize.height > windowHeight) return;

    setIsResizing(true);
    setResizedSize(getConstrainedSize(persistedSize));
    const timeOut = setTimeout(() => setIsResizing(false), 0);

    return () => clearTimeout(timeOut);
  }, [appSettings, getConstrainedSize, isEnabled, resizeSettingsKey, windowHeight]);

  return {
    onResizeStart,
    resizedSize,
    isResizing,
  };
};

export default useResizablePanel;
