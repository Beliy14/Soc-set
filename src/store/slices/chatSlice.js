import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  textMessage: "",
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeMessage: (state, action) => {
      state.textMessage = action.payload
    },
  },
})

export const { changeMessage } = chatSlice.actions
export default chatSlice.reducer
