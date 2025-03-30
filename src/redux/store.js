import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import authReducer from './slices/authSlice';

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for Redux Persist
  whitelist: ['auth'], // Persist only the auth state
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);
