import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentPage: 1,
  totalUsersCount: 1
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    toggleFollowUser: (state, action) => {
      state.users = state.users.map((u) => {
        if (u.id === action.payload) {
          return { ...u, followed: !u.followed };
        }
        return u;
      });
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setTotalUsersCount: (state, action) => {
      state.totalUsersCount = action.payload
    }
  },
});

export const { toggleFollowUser, setUsers, setCurrentPage, setTotalUsersCount } = usersSlice.actions;
export default usersSlice.reducer;