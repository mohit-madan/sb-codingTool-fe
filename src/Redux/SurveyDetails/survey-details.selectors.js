import { createSelector } from 'reselect';

const selectSurveyDetailsReducer = state => state.surveyDetails;

export const selectSurveyDetails = createSelector(
  [selectSurveyDetailsReducer],
  user => user.surveyDetails
);
