import { excelDataActionTypes } from './excel-data.types';

const INITIAL_STATE = {
    excelData:null,
    excelDataColumns:null,
    excelFileName:''
};

const excelDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case excelDataActionTypes.SET_EXCEL_DATA:
      return {
        ...state,
        excelData: action.payload
      };
    case excelDataActionTypes.SET_EXCEL_DATA_COLUMNS:
      return {
        ...state,
        excelDataColumns: action.payload
      };
      case excelDataActionTypes.SET_EXCEL_FILE_NAME:
        return {
          ...state,
          excelFileName: action.payload
        };
    default:
      return state;
  }
};

export default excelDataReducer;
