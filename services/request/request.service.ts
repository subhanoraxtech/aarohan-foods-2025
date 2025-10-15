

// // request.api.ts
// import { createApi } from '@reduxjs/toolkit/query/react'
// import { baseQueryWithReauth } from '../base.service'
// import { RequestPayload } from './request.request'

// const API_PREFIX = 'request/create-request'

// export const requestApi = createApi({
//   reducerPath: 'requestApi',
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Bundles', 'Orders', 'Stats'], // Added related tag types
//   endpoints: builder => ({
//     createRequest: builder.mutation({
//       query: (requestData: RequestPayload) => ({
//         url: `${API_PREFIX}`,
//         method: 'POST',
//         body: requestData,
//       }),
//       invalidatesTags: [
//         'Bundles', 
//         'Orders', 
//         'Stats',
//       ],
//     }),
//   }),
// })

// export const { useCreateRequestMutation } = requestApi

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'
import { RequestPayload } from './request.request'
import { bundlesApi } from '../bundle/bundles.service'
import { ordersApi } from '../order/order.service'
import { statsApi } from '../stats/stats.service'


const API_PREFIX = 'request/create-request'

export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Bundles', 'Orders', 'Stats'],
  endpoints: builder => ({
    createRequest: builder.mutation({
      query: (requestData: RequestPayload) => ({
        url: `${API_PREFIX}`,
        method: 'POST',
        body: requestData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(bundlesApi.util.invalidateTags(['Bundles']))
          dispatch(ordersApi.util.invalidateTags(['Orders']))
          dispatch(statsApi.util.invalidateTags(['Stats']))
        } catch {}
      },
    }),
  }),
})

export const { useCreateRequestMutation } = requestApi
