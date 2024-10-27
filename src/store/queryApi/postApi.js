import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../consts"

export const postApi = createApi({
  reducerPath: "postApi",
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
    getPost: builder.query({
      query: () => ({
        url: `/todo-lists`,
      }),
    }),

    createPost: builder.mutation({
      query: (title) => ({
        url: `/todo-lists`,
        method: "POST",
        body: { title },
      }),
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE",
      }),
    }),

    updatePostTitle: builder.mutation({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
    }),
  }),
})

export const { useGetPostQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostTitleMutation } = postApi
