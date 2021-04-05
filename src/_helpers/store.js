import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../Reducers';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { handler } from '../Redux/ApiCalls/ApiCalls.sagas';
const sagaMiddleware = createSagaMiddleware();
// const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        // loggerMiddleware,
        sagaMiddleware
    )
);
sagaMiddleware.run(handler);

export const persistor = persistStore(store);
export default { store, persistStore };
