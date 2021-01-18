import { SurveyDetailsActionTypes } from './survey-details.types.js';

const INITIAL_STATE = {
  surveyDetails: null
};

const surveyDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SurveyDetailsActionTypes.SET_SURVEY_DETAILS:
      return {
        ...state,
        surveyDetails: action.payload
      };
    default:
      return state;
  }
};

export default surveyDetailsReducer;
