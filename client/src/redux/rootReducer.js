import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import linksReducer from './linksSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    links: linksReducer,
});

export default rootReducer;
