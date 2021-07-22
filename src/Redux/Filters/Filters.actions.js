import { FiltersActionTypes } from './Filters.types';

export const setFilters = user => ({
  type: FiltersActionTypes.SET_FILTERS,
  payload: user
});
export const setSubmitFilters = user => ({
  type: FiltersActionTypes.SET_SUBMIT_FILTERS,
  payload: user
});
export const setAppliedFilters = user => ({
  type: FiltersActionTypes.SET_APPLIED_FILTERS,
  payload: user
});