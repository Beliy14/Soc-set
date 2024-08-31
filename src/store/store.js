import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import usersReducer from "./slices/usersSlice";
import { usersApi } from "./queryApi/usersApi";
import { profileApi } from "./queryApi/profileApi";
import profileReducer from "./slices/profileSlice";
import { authApi } from "./queryApi/authApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    profile: profileReducer,
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware).concat(profileApi.middleware).concat(authApi.middleware),
});