import { ContainsKeywordActionTypes } from './ContainsKeyword.types';

export const setContainsKeyword = user => ({
  type: ContainsKeywordActionTypes.SET_CONTAINS_KEYWORD,
  payload: user
});
