import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertVisible: false
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertVisible: (state, action) => {
      state.alertVisible = action.payload;
    },
  },
});

export const { setAlertVisible } = alertSlice.actions;
export default alertSlice.reducer;