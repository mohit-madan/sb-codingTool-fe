import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import excelDataReducer from './ExcelData/excel-data.reducer';
import progressNumberReducer from './Progress-number/progress.reducer';
import surveyDetailsReducer from './SurveyDetails/survey-details.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['']
};

const rootReducer = combineReducers({
    progressNumber:progressNumberReducer,
    surveyDetails:surveyDetailsReducer,
    excelData:excelDataReducer,
});

export default persistReducer(persistConfig, rootReducer);
