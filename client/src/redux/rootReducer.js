import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import linksReducer from './linksSlice';
import qrsReducer from './qrSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    links: linksReducer,
    qrs: qrsReducer,
});

export default rootReducer;
