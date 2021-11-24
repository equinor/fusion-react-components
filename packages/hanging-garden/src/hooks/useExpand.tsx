import { useContext } from 'react';
import { ExpandContext, ExpandDispatchContext } from '../providers/ExpandProvider';
/** Hook for using the expand context */
export const useExpand = () => {
  const context = useContext(ExpandContext);
  if (context === undefined) {
    throw new Error('useExpandContext must be used within a ExpandProvider');
  }
  return context;
};

/** Hook for using the expand dispatch context */
export const useExpandDispatch = () => {
  const context = useContext(ExpandDispatchContext);
  if (context === undefined) {
    throw new Error('useExpandDispatch must be used within a ExpandProvider');
  }
  return context;
};
