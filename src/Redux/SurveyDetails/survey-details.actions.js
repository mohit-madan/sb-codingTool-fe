import { SurveyDetailsActionTypes } from './survey-details.types.js';

export const setSurveyDetails = user => ({
  type: SurveyDetailsActionTypes.SET_SURVEY_DETAILS,
  payload: user
});
