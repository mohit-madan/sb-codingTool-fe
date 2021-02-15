import { createSelector } from 'reselect';

const selectUploaderAlertsReducer = state => state.uploaderAlerts;

export const selectShowUploaderAlerts = createSelector(
  [selectUploaderAlertsReducer],
  user => user.showUploaderAlerts
);
export const selectAlertMessage = createSelector(
    [selectUploaderAlertsReducer],
    user => user.alertMesssage
);
  
