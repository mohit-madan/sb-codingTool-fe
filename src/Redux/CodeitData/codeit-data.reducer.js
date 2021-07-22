import { codeItDataActionTypes } from './codeit-data.types';

const INITIAL_STATE = {
    codes:null,
    keywords:null,
    progresslength:0,
    numberOfInputsGreaterThan2:0,
    selectedRows:null,
    filteredData:null,
    questionNumber:0,
    leftMenuCodes:[],
    sortBy:null,
    codingSummary:{}
};

const codeItDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case codeItDataActionTypes.SET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload
      };
    case codeItDataActionTypes.SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.payload
      };
    case codeItDataActionTypes.SET_CODES:
      return {
        ...state,
        codes: action.payload
      };
    
    case codeItDataActionTypes.SET_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: action.payload
    };
    case codeItDataActionTypes.SET_QUESTION_NUMBER:
      return {
        ...state,
        questionNumber: action.payload
    };
    case codeItDataActionTypes.SET_LEFT_MENU_CODES:
      return {
        ...state,
        leftMenuCodes: action.payload
    };
    case codeItDataActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
    };
    case codeItDataActionTypes.SET_CODING_SUMMARY:
      return {
        ...state,
        codingSummary: action.payload
    };
    default:
      return state;
  }
};

export default codeItDataReducer;

// case codeItDataActionTypes.INCREASE_PROGRESS_LENGTH:
//   return {
//     ...state,
//     progresslength: state.progresslength+action.payload
//   };
// case codeItDataActionTypes.DECREASE_PROGRESS_LENGTH:
//     return {
//       ...state,
//       progresslength: state.progresslength-action.payload
//   };
// case codeItDataActionTypes.INCREASE_NUMBER_OF_INPUTS:
//   return {
//     ...state,
//     numberOfInputsGreaterThan2: state.numberOfInputsGreaterThan2+1
// };
// case codeItDataActionTypes.DECREASE_NUMBER_OF_INPUTS:
//   return {
//     ...state,
//     numberOfInputsGreaterThan2: state.numberOfInputsGreaterThan2-1
// };
// case codeItDataActionTypes.SET_KEYWORDS:
// return {
//   ...state,
//   keywords: action.payload
// };