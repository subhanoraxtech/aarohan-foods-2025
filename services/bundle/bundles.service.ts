
// // bundles.api.ts
// import { createApi } from '@reduxjs/toolkit/query/react'
// import { baseQueryWithReauth } from '../base.service'
// import { ListAllBundlesResponse } from './bundle.response'
// import { ListAllBundlesRequest } from './bundle.request'

// const API_PREFIX = 'bundles'

// export const bundlesApi = createApi({
//   reducerPath: 'bundlesApi',
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Bundles', 'Orders', 'Stats'], // Added related tag types
//   endpoints: builder => ({
//     getAllBundles: builder.query<ListAllBundlesResponse, ListAllBundlesRequest>({
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
//       providesTags: (result, error, arg) => [
//         'Bundles',
//         ...((result?.bundles || []).map((bundle: any) => ({ type: 'Bundles' as const, id: bundle._id }))),
//       ]
//     }),

//     getOrdersByBundleId: builder.query({
//       query: ({ id }) => {
//         return {
//           url: `${API_PREFIX}/getOdersbyBundleId/${id}`,
//           method: 'GET'
//         }
//       },
//       transformResponse: (response: any) => response.data,
//       providesTags: (result, error, { id }) => [
//         { type: 'Orders', id: `bundle-${id}` },
//         'Orders'
//       ]
//     }),
//   }),
// })

// export const { useGetAllBundlesQuery, useGetOrdersByBundleIdQuery } = bundlesApi


import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'
import { ListAllBundlesResponse } from './bundle.response'
import { ListAllBundlesRequest } from './bundle.request'

const API_PREFIX = 'bundles'

export const bundlesApi = createApi({
  reducerPath: 'bundlesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Bundles', 'Orders', 'Stats'],
  endpoints: builder => ({
    getAllBundles: builder.query<ListAllBundlesResponse, ListAllBundlesRequest>({
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
      providesTags: ["Bundles"]

      
    }),

    getOrdersByBundleId: builder.query({
      query: ({ id }) => ({
        url: `${API_PREFIX}/getOdersbyBundleId/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: (result, error, { id }) => [
        { type: 'Orders', id: `bundle-${id}` },
        'Orders',
      ],
    }),
  }),
})

export const { useGetAllBundlesQuery, useGetOrdersByBundleIdQuery } = bundlesApi
