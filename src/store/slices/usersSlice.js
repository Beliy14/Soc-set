import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentPage: 1,
  totalUsersCount: 1,
  isFollowingProgress: []
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
      state.currentPage = action.payload;
    },

    setTotalUsersCount: (state, action) => {
      state.totalUsersCount = action.payload;
    },

    setIsFollowingProgress: (state, action) => {
      const { isFetching, userId } = action.payload;
      if (isFetching) {
        state.isFollowingProgress.push(userId);
      } else {
        state.isFollowingProgress = state.isFollowingProgress.filter(id => id !== userId);
      }
    }
  },
});

export const { toggleFollowUser, setUsers, setCurrentPage, setTotalUsersCount, setIsFollowingProgress } = usersSlice.actions;
export default usersSlice.reducer;