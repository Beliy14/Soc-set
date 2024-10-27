import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./slices/usersSlice"
import profileReducer from "./slices/profileSlice"
import authReducer from "./slices/authSlice"
import alertReducer from "./slices/alertSlice"
import chatReducer from "./slices/chatSlice"
import languageReducer from "./slices/languageSlice"
import { authApi } from "./queryApi/authApi"
import { profileApi } from "./queryApi/profileApi"
import { usersApi } from "./queryApi/usersApi"
import { securityApi } from "./queryApi/securityApi"
import { postApi } from "./queryApi/postApi"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    profile: profileReducer,
    chat: chatReducer,
    auth: authReducer,
    alert: alertReducer,
    language: languageReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware).concat(profileApi.middleware).concat(authApi.middleware).concat(securityApi.middleware).concat(postApi.middleware),
})
