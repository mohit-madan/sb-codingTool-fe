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
import showCodedAsReducer from '../Redux/Show_Coded_As/Show_Coded_As.reducer';
import ContainsKeywordReducer from '../Redux/ContainsKeyword/ContainsKeyword.reducer';
import LoadingReducer from '../Redux/Loading/Loading.reducer';
import FiltersReducer from '../Redux/Filters/Filters.reducer';
import UploaderAlertsReducer from '../Redux/UploaderAlerts/UploaderAlerts.reducer';

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
    showCodedAs:showCodedAsReducer,
    ContainsKeyword:ContainsKeywordReducer,
    loading:LoadingReducer,
    filters:FiltersReducer,
    uploaderAlerts:UploaderAlertsReducer,
});

export default rootReducer;