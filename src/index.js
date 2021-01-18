import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './_helpers/store';

import { App } from './App';
import "./index.css"
import { BrowserRouter } from 'react-router-dom';
render(
    <Provider store={store}>
        {/* <BrowserRouter>
        <PersistGate persistor={persistor}> */}
            <App />
        {/* </PersistGate>
        </BrowserRouter> */}
    </Provider>,
    document.getElementById('root')
);