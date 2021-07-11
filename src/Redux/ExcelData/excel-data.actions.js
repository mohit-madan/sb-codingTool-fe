import { excelDataActionTypes } from './excel-data.types';

export const setExcelData = user => ({
  type: excelDataActionTypes.SET_EXCEL_DATA,
  payload: user
});
export const setExcelDataColumns = user => ({
  type: excelDataActionTypes.SET_EXCEL_DATA_COLUMNS,
  payload: user
});

export const setExcelDataHeaders = user => ({
  type: excelDataActionTypes.SET_EXCEL_DATA_HEADERS,
  payload: user
});
// SET_EXCEL_FILE_NAME
export const setExcelFileName = user => ({
  type: excelDataActionTypes.SET_EXCEL_FILE_NAME,
  payload: user
});