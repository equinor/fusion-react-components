import useCurrentBookmark from '@equinor/fusion-framework-react-module-bookmark';
import { PowerBIComponentConfig } from '../view/PowerBIReportView';

export const useBookmarkWithConfig = (config?: PowerBIComponentConfig) => {
  const { currentBookmark } = useCurrentBookmark<string>();
  return currentBookmark && config ? Object.assign(config, { bookmark: { state: currentBookmark.payload } }) : config;
};
