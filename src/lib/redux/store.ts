// Importing necessary libraries and functions from Redux toolkit and Redux Persist.
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import authReducer from './slices/authSlice';
import blogPostReducer from './slices/blogPostSlice';
import userPostReducer from './slices/UserPostSlice';
// Importing reducers from slices.
import userReducer from './slices/userSlice';
type StorageValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: StorageValue }
  | StorageValue[];

const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<StorageValue | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: StorageValue): Promise<StorageValue> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

// Configuration object for redux-persist.
const persistConfig = {
  key: 'root', // Key for the storage. State will be saved with this key in storage.
  storage, // Specify which storage to use.
  whitelist: ['auth'], // Which reducers should be persisted. In this case, only 'auth' will be persisted.
};

// Combining all the reducers.
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  blogPost: blogPostReducer,
  userPost: userPostReducer,
});

// Wrapping the combined reducer with persistReducer to add persistence capabilities.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux store.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignoring the action 'persist/PERSIST' for serializability check since it's part of redux-persist.
      ignoredActions: ['persist/PERSIST'],
    },
  }),
});

// Creating a persistor object which will be used in the app to wrap around the root component.
export const persistor = persistStore(store);

// Defining types for the root state and the app dispatch.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
