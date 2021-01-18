import { createSelector } from 'reselect';

const selectProgressNumberReducer = state => state.progressNumber;

export const selectProgressNumber = createSelector(
  [selectProgressNumberReducer],
  user => user.progressNumber
);
