import { createSelector } from 'reselect';

const codeItDataReducer = state => state.codeItData;

export const selectCodes = createSelector(
  [codeItDataReducer],
  user => user.codes
);
export const selectKeywords = createSelector(
  [codeItDataReducer],
  user => user.keywords
);
export const selectProgressLength = createSelector(
  [codeItDataReducer],
  user => user.progresslength
);
//numberOfInputsGreaterThan2
export const selectnumberOfInputsGreaterThan2 = createSelector(
  [codeItDataReducer],
  user => user.numberOfInputsGreaterThan2
);
export const selectSelectedRows = createSelector(
  [codeItDataReducer],
  user => user.selectedRows
);
export const selectFilteredData = createSelector(
  [codeItDataReducer],
  user => user.filteredData
);
export const selectQuestionNumber = createSelector(
  [codeItDataReducer],
  user => user.questionNumber
);
export const selectLeftMenuCodes = createSelector(
  [codeItDataReducer],
  user => user.leftMenuCodes
);
// questionNumber