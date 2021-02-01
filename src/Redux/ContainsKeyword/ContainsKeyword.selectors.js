import { createSelector } from 'reselect';

const selectContainsKeywordReducer = state => state.ContainsKeyword;

export const selectContainsKeyword = createSelector(
  [selectContainsKeywordReducer],
  user => user.ContainsKeyword
);
