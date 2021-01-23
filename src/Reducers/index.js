import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import googleSignIn from "./googleSignIn-Reducer"
import progressNumberReducer from '../Redux/Progress-number/progress.reducer';
import surveyDetailsReducer from '../Redux/SurveyDetails/survey-details.reducer';
import excelDataReducer from '../Redux/ExcelData/excel-data.reducer';
import tableSelectionsReducer from '../Redux/SelectedRowandColumn/tableSelections.reducer';
import codeItDataReducer from '../Redux/CodeitData/codeit-data.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    googleUser:googleSignIn,
    progressNumber:progressNumberReducer,
    surveyDetails:surveyDetailsReducer,
    excelData:excelDataReducer,
    tableSelections:tableSelectionsReducer,
    codeItData:codeItDataReducer,
});

export default rootReducer;