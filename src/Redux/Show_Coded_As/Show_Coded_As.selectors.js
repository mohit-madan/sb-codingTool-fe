import { createSelector } from 'reselect';

const selectShowCodedAsReducer = state => state.showCodedAs;

export const selectShowCodedAs = createSelector(
  [selectShowCodedAsReducer],
  user => user.showCodedAs
);
