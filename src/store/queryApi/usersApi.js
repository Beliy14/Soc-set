import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, API_KEY, TOKEN } from "../consts"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", API_KEY)
      headers.set("Authorization", `Bearer ${TOKEN}`)
      return headers
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
