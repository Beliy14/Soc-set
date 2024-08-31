import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, API_KEY, TOKEN } from "../consts"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", API_KEY)
      headers.set('Authorization', `Bearer ${TOKEN}`)
      return headers
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" })
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page) => ({
        url: `/users?page=${page}&count=5`,
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

export const { useGetUsersQuery, useFollowUserMutation, useUnFollowUserMutation } = usersApi
