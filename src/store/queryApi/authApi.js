import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../consts"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", localStorage.getItem("apiKey"))
      return headers
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" })
    },
  }),
  endpoints: (builder) => ({
    
    authMe: builder.query({
      query: () => ({
        url: `/auth/me`,
      }),
    }),

    logIn: builder.mutation({
      query: ({ email, password, rememberMe = false }) => ({
        url: `/auth/login`,
        method: "POST",
        body: { email, password, rememberMe },
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: `/auth/login`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useAuthMeQuery, useLogInMutation, useLogOutMutation } = authApi
