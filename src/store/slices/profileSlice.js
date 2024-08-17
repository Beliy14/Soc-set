import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profile: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, acion) => {
      state.profile = acion.payload
    },
  },
})

export const { setUserProfile } = profileSlice.actions
export default profileSlice.reducer
