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

