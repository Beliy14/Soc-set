import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profileId: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profileId = action.payload
    },
  },
})

export const { setUserProfile } = profileSlice.actions
export default profileSlice.reducer
