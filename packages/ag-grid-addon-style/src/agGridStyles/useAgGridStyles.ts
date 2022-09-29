import { useEffect } from 'react';
import { agStyles } from './styles.css';

export const useAgGridStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = agStyles;
    style.id = 'ag-grid-styles';
    document.head.append(style);

    return () => style.remove();
  }, []);
};

export default useAgGridStyles;
