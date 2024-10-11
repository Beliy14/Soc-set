import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import usersReducer from "./slices/usersSlice";
import profileReducer from "./slices/profileSlice";
import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import chatReducer from "./slices/chatSlice";
import { authApi } from "./queryApi/authApi";
import { profileApi } from "./queryApi/profileApi";
import { usersApi } from "./queryApi/usersApi";
import { securityApi } from "./queryApi/securityApi";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    profile: profileReducer,
    chat: chatReducer,
    auth: authReducer,
    alert: alertReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware).concat(profileApi.middleware).concat(authApi.middleware).concat(securityApi.middleware),
});