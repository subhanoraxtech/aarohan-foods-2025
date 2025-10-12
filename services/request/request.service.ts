// import { createApi } from '@reduxjs/toolkit/query/react'
// import { baseQueryWithReauth } from '../base.service'
// import { RequestPayload } from './request.request'

// const API_PREFIX = 'request/create-request'

// export const requestApi = createApi({
//   reducerPath: 'requestApi',
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Bundles'],
//   endpoints: builder => ({
//     createRequest: builder.mutation({
//       query: (requestData: RequestPayload) => ({
//         url: `${API_PREFIX}`,
//         method: 'POST',
//         body: requestData,
//       }),
//       invalidatesTags: ['Bundles'],
//     }),
//   }),
// })

// export const { useCreateRequestMutation } = requestApi

// request.api.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'
import { RequestPayload } from './request.request'

const API_PREFIX = 'request/create-request'

export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Bundles', 'Orders', 'Stats'], // Added related tag types
  endpoints: builder => ({
    createRequest: builder.mutation({
      query: (requestData: RequestPayload) => ({
        url: `${API_PREFIX}`,
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: [
        'Bundles', 
        'Orders', 
        'Stats',
      ],
    }),
  }),
})

export const { useCreateRequestMutation } = requestApi