import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import {StoreContext} from 'redux-react-hook';
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import 'bootstrap/dist/css/bootstrap.css';

const composeEnhancers = composeWithDevTools({});
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
