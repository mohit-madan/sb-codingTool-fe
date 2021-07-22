import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../Reducers';
import { persistStore } from 'redux-persist';
const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        loggerMiddleware
    )
);

export const persistor = persistStore(store);
export default { store, persistStore };
