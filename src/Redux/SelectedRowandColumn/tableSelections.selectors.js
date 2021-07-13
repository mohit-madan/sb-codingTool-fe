import { createSelector } from 'reselect';

const selectTableSelectionsReducer = state => state.tableSelections;

export const selectRow = createSelector(
  [selectTableSelectionsReducer],
  user => user.row
);
export const selectColumn = createSelector(
    [selectTableSelectionsReducer],
    user => user.column
);
export const selectFilterColumn = createSelector(
  [selectTableSelectionsReducer],
  user => user.filterColumn
);

  