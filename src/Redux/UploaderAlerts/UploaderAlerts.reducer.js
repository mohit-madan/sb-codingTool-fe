import { UploaderAlertsActionTypes } from './UploaderAlerts.types';

const INITIAL_STATE = {
    showUploaderAlerts: false,
    alertMesssage:""
};

const UploaderAlertsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UploaderAlertsActionTypes.SET_SHOW_ALERT_MESSAGE:
    return {
      ...state,
      showUploaderAlerts: action.payload
    };
    case UploaderAlertsActionTypes.SET_ALERT_MESSAGE:
    return {
      ...state,
      alertMesssage: action.payload
    };
    default:
    return state;
  }
};

export default UploaderAlertsReducer;
