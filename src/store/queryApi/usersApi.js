import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../consts"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("API-KEY", localStorage.getItem("apiKey"));
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" })
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, term, friend }) => {
        let url = `/users?page=${page}&count=4`
        if (term) {
          url += `&term=${term}`
        }
        if (friend) {
          url += `&friend=${friend}`
        }
        return { url }
      },
    }),

    getFollowedUser: builder.query({
      query: (userId) => ({
        url: `/follow/${userId}`,
      }),
    }),

    followUser: builder.mutation({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "POST",
      }),
    }),

    unFollowUser: builder.mutation({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useGetUsersQuery, useFollowUserMutation, useUnFollowUserMutation, useGetFollowedUserQuery } = usersApi
