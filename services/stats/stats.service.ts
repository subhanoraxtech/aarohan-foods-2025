

// // stats.api.ts
// import { createApi } from '@reduxjs/toolkit/query/react'
// import { baseQueryWithReauth } from '../base.service'

// const API_PREFIX = 'orders/stats'

// export const statsApi = createApi({
//   reducerPath: 'statsApi',
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Stats', 'Orders', 'Bundles'], // Added related tag types
//   endpoints: builder => ({
//     getStats: builder.query({
//       query: ({ payload }) => {
//         const queryParams = new URLSearchParams()

//         Object.entries(payload).forEach(([key, value]) => {
//           if (typeof value !== 'undefined' && value !== '') {
//             queryParams.append(key, String(value))
//           }
//         })

//         return {
//           url: `${API_PREFIX}?${queryParams.toString()}`,
//           method: 'GET'
//         }
//       },
//       transformResponse: (response: any) => response.data,
//       providesTags: ['Stats']
//     }),
//   })
// })

// export const { useGetStatsQuery } = statsApi

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'

const API_PREFIX = 'orders/stats'

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Stats', 'Orders', 'Bundles'],
  endpoints: builder => ({
    getStats: builder.query({
      query: ({ payload }) => {
        const queryParams = new URLSearchParams()

        Object.entries(payload).forEach(([key, value]) => {
          if (typeof value !== 'undefined' && value !== '') {
            queryParams.append(key, String(value))
          }
        })

        return {
          url: `${API_PREFIX}?${queryParams.toString()}`,
          method: 'GET',
        }
      },
      transformResponse: (response: any) => response.data,
      providesTags: ['Stats'],
    }),
  }),
})

export const { useGetStatsQuery } = statsApi
