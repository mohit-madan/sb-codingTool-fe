import { codeItDataActionTypes } from './codeit-data.types';

export const setCodes = user => ({
  type: codeItDataActionTypes.SET_CODES,
  payload: user
});
export const setKeywords = user => ({
  type: codeItDataActionTypes.SET_KEYWORDS,
  payload: user
});
export const increaseProgressLength = user => ({
  type: codeItDataActionTypes.INCREASE_PROGRESS_LENGTH,
  payload: user
});
export const decreaseProgressLength = user => ({
  type: codeItDataActionTypes.DECREASE_PROGRESS_LENGTH,
  payload: user
});
export const increaseNumberOfInputsGreaterThan2 = () => ({
  type: codeItDataActionTypes.INCREASE_NUMBER_OF_INPUTS,
});
export const decreaseNumberOfInputsGreaterThan2 = () => ({
  type: codeItDataActionTypes.DECREASE_NUMBER_OF_INPUTS,
});
// SET_SELECTED_ROWS
export const setSelectedRows = (user) => ({
  type: codeItDataActionTypes.SET_SELECTED_ROWS,
  payload: user
});
export const setFilteredData = (user) => ({
  type: codeItDataActionTypes.SET_FILTERED_DATA,
  payload: user
});
export const setQuestionNumber = (user) => ({
  type: codeItDataActionTypes.SET_QUESTION_NUMBER,
  payload: user
});
export const setLeftMenuCodes = (user) => ({
  type: codeItDataActionTypes.SET_LEFT_MENU_CODES,
  payload: user
});
export const setSortBy = (user) => ({
  type: codeItDataActionTypes.SET_SORT_BY,
  payload: user
});
export const setCodingSummary = (user) => ({
  type: codeItDataActionTypes.SET_CODING_SUMMARY,
  payload: user
});










