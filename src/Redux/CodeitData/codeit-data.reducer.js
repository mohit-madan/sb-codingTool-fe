import { codeItDataActionTypes } from './codeit-data.types';

const INITIAL_STATE = {
    codes:null,
    keywords:null,
    progresslength:0,
    numberOfInputsGreaterThan2:0,//numberOfInputsGreaterThan2
};

const codeItDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case codeItDataActionTypes.SET_CODES:
      return {
        ...state,
        codes: action.payload
      };
    case codeItDataActionTypes.SET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload
      };
    case codeItDataActionTypes.INCREASE_PROGRESS_LENGTH:
      return {
        ...state,
        progresslength: state.progresslength+action.payload
      };
    case codeItDataActionTypes.DECREASE_PROGRESS_LENGTH:
        return {
          ...state,
          progresslength: state.progresslength-action.payload
      };
    case codeItDataActionTypes.INCREASE_NUMBER_OF_INPUTS:
      return {
        ...state,
        numberOfInputsGreaterThan2: state.numberOfInputsGreaterThan2+1
    };
    case codeItDataActionTypes.DECREASE_NUMBER_OF_INPUTS:
      return {
        ...state,
        numberOfInputsGreaterThan2: state.numberOfInputsGreaterThan2-1
    };
    default:
      return state;
  }
};

export default codeItDataReducer;