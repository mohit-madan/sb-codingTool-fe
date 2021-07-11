import { createSelector } from 'reselect';

const selectExcelDataReducer = state => state.excelData;

export const selectExcelData = createSelector(
  [selectExcelDataReducer],
  user => user.excelData
);
export const selectExcelDataColumns = createSelector(
  [selectExcelDataReducer],
  user => user.excelDataColumns
);

export const selectExcelFileName = createSelector(
  [selectExcelDataReducer],
  user => user.excelFileName
);

export const selectExcelDataHeaders = createSelector(
  [selectExcelDataReducer],
  user => user.excelDataHeaders
);