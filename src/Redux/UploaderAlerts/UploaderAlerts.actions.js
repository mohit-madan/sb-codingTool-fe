import { UploaderAlertsActionTypes } from './UploaderAlerts.types';

export const setShowUploaderAlerts = user => ({
  type: UploaderAlertsActionTypes.SET_SHOW_ALERT_MESSAGE,
  payload: user
});
export const setAlertMessage = user => ({
    type: UploaderAlertsActionTypes.SET_ALERT_MESSAGE,
    payload: user
});
  