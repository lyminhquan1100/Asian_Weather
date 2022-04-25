import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { weatherReducer } from '../reducers/weatherReducers';
import { cityReducer } from '../reducers/cityReducer';
import { usersReducer } from '../reducers/usersReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    weatherReducer,
    cityReducer,
    usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;