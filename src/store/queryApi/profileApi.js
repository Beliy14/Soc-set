import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0' }),
  endpoints: (builder) => ({

    getProfile: builder.query({
      query: (id) => ({
        url: `/profile/${id}`, 
      }),
    }),


  }),
})

export const { useGetProfileQuery } = profileApi