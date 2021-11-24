import { createContext, FC, useReducer } from 'react';
import { ExpandedColumns } from '../models/ExpandedColumn';
import { getDescriptionWidth } from '../utils';

/** Expand context state properties */
export type State = {
  /** Expanded saved in a dictionary */
  expandedColumns: ExpandedColumns;

  /** Widths of the packages in the garden */
  widths: number[];
};

/** Action types for expand dispatch */
export enum ActionType {
  EXPAND = 'Expand',
}

/** Arguments when dispatching expand action  */
type ExpandAction = {
  /** Key is extracted from the column object */
  key: string;

  /** Index from the column array */
  index: number;
  descriptionData: any;
  type: ActionType.EXPAND;
};

type DispatchAction = (action: ExpandAction) => void;
const ExpandContext = createContext<State>({ expandedColumns: {}, widths: [] });
const ExpandDispatchContext = createContext<DispatchAction | undefined>(undefined);
//Action can be union type if more actions are added...
type Action = ExpandAction;

/**
 * Reducer for expand action, used in the useReducer hook in the ExpandProvider
 * Will check if the column is added in a dictionary of expandedColumns, if not it will add it as a record
 * Checking if the column is expanded, if it is and action is dispatched: reduce width of that column, increase it if not.
 * @todo only one action type now, no need for switch case
 */
const expandReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.EXPAND: {
      const width = getDescriptionWidth(action.descriptionData);
      if (state.expandedColumns && state.expandedColumns[action.key]) {
        const currWidths = [...state.widths];
        currWidths[action.index] = state.expandedColumns[action.key].isExpanded
          ? currWidths[action.index] - width!
          : currWidths[action.index] + width!;
        return {
          expandedColumns: {
            ...state.expandedColumns,
            [action.key]: {
              ...state.expandedColumns[action.key],
              isExpanded: !state.expandedColumns[action.key].isExpanded,
            },
          },
          widths: currWidths,
        };
      } else {
        const currWidths = [...state.widths];
        currWidths[action.index] = currWidths[action.index] + width!;
        return {
          expandedColumns: {
            ...state.expandedColumns,
            [action.key]: {
              isExpanded: true,
              index: action.index,
            },
          },
          widths: currWidths,
        };
      }
    }

    default:
      return { expandedColumns: {}, widths: [] };
  }
};
/** Provider for column expand data and dispatching expand actions wrapped around the main
 * Garden component.
 */
const ExpandProvider: FC<{ initialWidths: number[] }> = (props) => {
  const [state, dispatch] = useReducer(expandReducer, {
    expandedColumns: {},
    widths: props.initialWidths,
  });
  return (
    <ExpandContext.Provider value={state}>
      <ExpandDispatchContext.Provider value={dispatch}>{props.children}</ExpandDispatchContext.Provider>
    </ExpandContext.Provider>
  );
};

export { ExpandContext, ExpandProvider, ExpandDispatchContext };
