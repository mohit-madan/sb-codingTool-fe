import { excelDataActionTypes } from './excel-data.types';

export const setExcelData = user => ({
  type: excelDataActionTypes.SET_EXCEL_DATA,
  payload: user
});
export const setExcelDataColumns = user => ({
  type: excelDataActionTypes.SET_EXCEL_DATA_COLUMNS,
  payload: user
});