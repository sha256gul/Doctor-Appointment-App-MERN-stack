

import loaderReducer from "./reducers/loader";
import userDetailsReducer from "./reducers/userDetails";
import docReducer from './reducers/doctors.js'
import thunk from 'redux-thunk';



import {legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'


const rootReducer = combineReducers({
    loader: loaderReducer,
    userDetails: userDetailsReducer,
    doc: docReducer
});


const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;





