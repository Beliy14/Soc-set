import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./slices/postSlice"
import localStorageMiddleware from '../localStorage/localStorageMiddleware';
import loadState from '../localStorage/loadState';
import dataProfileReducer from "./slices/dataProfileSlice";

const preloadedState = loadState();


export const store = configureStore({
  reducer: {
      posts: postReducer,
      dataProfile: dataProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState
});