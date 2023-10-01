import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReduxer from './reducers';

const initailState = {};
const middleware = [thunk];

const store = createStore(
    rootReduxer,
    initailState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
