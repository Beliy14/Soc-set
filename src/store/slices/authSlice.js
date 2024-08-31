import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserData: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
    },
  },
});

export const { setAuthUserData } = authSlice.actions;
export default authSlice.reducer;