import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_KEY, BASE_URL } from "../consts"

export const securityApi = createApi({
  reducerPath: "securityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", API_KEY)
      return headers
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" })
    },
  }),
  endpoints: (builder) => ({
    
    getCaptchaUrl: builder.query({
      query: () => ({
        url: `/security/get-captcha-url`,
      }),
    }),

  }),
})

export const { useGetCaptchaUrlQuery } = securityApi
