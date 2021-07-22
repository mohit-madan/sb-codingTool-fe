import { FiltersActionTypes } from './Filters.types';

const INITIAL_STATE = {
  filters: null,
  submitFilters:false,
  appliedFilters:null
};

const FiltersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FiltersActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case FiltersActionTypes.SET_SUBMIT_FILTERS:
      return {
        ...state,
        submitFilters:  action.payload
      };
    case FiltersActionTypes.SET_APPLIED_FILTERS:
    return {
      ...state,
      appliedFilters:  action.payload
    };
    default:
      return state;
  }
};

export default FiltersReducer;
