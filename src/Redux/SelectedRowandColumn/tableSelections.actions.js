import { tableSelectionActionTypes } from './tableSelections.types';

export const setRow = user => ({
  type: tableSelectionActionTypes.SET_ROW,
  payload: user
});

export const setColumn = user => ({
    type: tableSelectionActionTypes.SET_COLUMN,
    payload: user
});
  