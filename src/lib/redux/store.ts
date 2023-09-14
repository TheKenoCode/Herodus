// Importing necessary libraries and functions from Redux toolkit and Redux Persist.
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { persistReducer, persistStore } from 'redux-persist'

// Importing reducers from slices.
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import blogPostReducer from './slices/blogPostSlice'
import userPostReducer from './slices/UserPostSlice'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

// Configuration object for redux-persist.
const persistConfig = {
  key: 'root', // Key for the storage. State will be saved with this key in storage.
  storage, // Specify which storage to use.
  whitelist: ['auth'], // Which reducers should be persisted. In this case, only 'auth' will be persisted.
}

// Combining all the reducers.
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  blogPost: blogPostReducer,
  userPost: userPostReducer,
})

// Wrapping the combined reducer with persistReducer to add persistence capabilities.
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuring the Redux store.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignoring the action 'persist/PERSIST' for serializability check since it's part of redux-persist.
      ignoredActions: ['persist/PERSIST'],
    },
  }),
})

// Creating a persistor object which will be used in the app to wrap around the root component.
export const persistor = persistStore(store)

// Defining types for the root state and the app dispatch.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch