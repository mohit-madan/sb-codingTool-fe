import { createSelector } from 'reselect';

const selectFiltersReducer = state => state.filters;

export const selectFilters = createSelector(
  [selectFiltersReducer],
  user => user.filters
);
export const selectSubmitFilters = createSelector(
  [selectFiltersReducer],
  user => user.submitFilters
);
export const selectAppliedFilters = createSelector(
  [selectFiltersReducer],
  user => user.appliedFilters
);
