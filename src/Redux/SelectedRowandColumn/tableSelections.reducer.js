import { tableSelectionActionTypes } from './tableSelections.types';

const INITIAL_STATE = {
  row: null,
  column:null
};

const tableSelectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tableSelectionActionTypes.SET_ROW:
      return {
        ...state,
        row: action.payload
    };
    case tableSelectionActionTypes.SET_COLUMN:
      return {
        ...state,
        column: action.payload
    };
    default:
      return state;
  }
};

export default tableSelectionsReducer;
