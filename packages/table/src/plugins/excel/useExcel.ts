import { Hooks } from 'react-table';
import { TableData } from '../../types';
import useInstance from './useInstance';
import reducer from './reducer';
import './types';

export const useExcel = <D extends TableData>(hooks: Hooks<D>): void => {
  hooks.stateReducers.push(reducer<D>({ export: {} }));
  hooks.useInstance.push(useInstance);
};

export default useExcel;
