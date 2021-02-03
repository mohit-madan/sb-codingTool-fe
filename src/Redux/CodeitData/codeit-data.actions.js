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