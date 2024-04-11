// import { createStore } from 'redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer'; // Import your rootReducer

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Persist only the 'auth' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };
