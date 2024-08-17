import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0' }),
  endpoints: (builder) => ({

    getUsers: builder.query({
      query: (page) => ({
        url: `/users?page=${page}&count=5`,
      }),
    }),
  }),
})

export const { useGetUsersQuery } = usersApi