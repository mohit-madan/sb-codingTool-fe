import { ContainsKeywordActionTypes } from './ContainsKeyword.types';

const INITIAL_STATE = {
    ContainsKeyword: null
};

const ContainsKeywordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContainsKeywordActionTypes.SET_CONTAINS_KEYWORD:
      return {
        ...state,
        ContainsKeyword: action.payload
      };
    default:
      return state;
  }
};

export default ContainsKeywordReducer;
