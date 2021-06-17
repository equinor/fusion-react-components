import { Hooks } from 'react-table';
import { TableData } from '../../types';

import useInstance from './useInstance';
import reducer from './reducer';

import './types';

export const useColumnMenu = <D extends TableData>(hooks: Hooks<D>): void => {
  hooks.stateReducers.push(
    reducer<D>({ menu: {} })
  );
  hooks.useInstance.push(useInstance);
};

export default useColumnMenu;
