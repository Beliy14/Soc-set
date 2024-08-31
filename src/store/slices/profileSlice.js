import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profileId: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, acion) => {
      state.profileId = acion.payload
    },
  },
})

export const { setUserProfile } = profileSlice.actions
export default profileSlice.reducer
