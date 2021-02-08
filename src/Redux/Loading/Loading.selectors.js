import { createSelector } from 'reselect';

const selectLoadingReducer = state => state.loading;

export const selectLoading = createSelector(
  [selectLoadingReducer],
  user => user.loading
);
