import { excelDataActionTypes } from './excel-data.types';

const INITIAL_STATE = {
    excelData:null
};

const excelDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case excelDataActionTypes.SET_EXCEL_DATA:
      return {
        ...state,
        excelData: action.payload
      };
    default:
      return state;
  }
};

export default excelDataReducer;
