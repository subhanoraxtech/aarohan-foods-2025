
// // orders.api.ts
// import { createApi } from '@reduxjs/toolkit/query/react'
// import { baseQueryWithReauth } from '../base.service'

// const API_PREFIX = 'orders'

// export const ordersApi = createApi({
//   reducerPath: 'ordersApi',
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Orders', 'Bundles', 'Stats'], // Added related tag types
//   endpoints: builder => ({
//     getAllOrders: builder.query({
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
//         'Orders',
//         ...((result?.orders || []).map((order: any) => ({ type: 'Orders' as const, id: order._id }))),
//       ]
//     }),

//     updateOrder: builder.mutation({
//       query: ({ _id, ...patch }) => ({
//         url: `${API_PREFIX}/order-completed/${_id}`,
//         method: 'PATCH',
//         body: patch,
//       }),
//       invalidatesTags: (result, error, { _id }) => [
//         'Orders',
//         'Stats', // Invalidate stats when order is updated
//         { type: 'Orders', id: _id },
//         { type: 'Orders', id: `bundle-${result?.bundleId}` }, // If order belongs to bundle
//       ]
//     }),

//     updateOrderReady: builder.mutation({
//       query: ({ _id, ...patch }) => ({
//         url: `${API_PREFIX}/order-ready/${_id}`,
//         method: 'PATCH',
//         body: patch,
//       }),
//       invalidatesTags: (result, error, { _id }) => [
//         'Orders',
//         'Stats', // Invalidate stats when order status changes
//         { type: 'Orders', id: _id },
//         { type: 'Orders', id: `bundle-${result?.bundleId}` }, // If order belongs to bundle
//       ]
//     }),

//     getOrderHistory: builder.query({
//       query: ({ payload }) => {
//         const queryParams = new URLSearchParams()

//         Object.entries(payload).forEach(([key, value]) => {
//           if (typeof value !== 'undefined' && value !== '') {
//             queryParams.append(key, String(value))
//           }
//         })

//         return {
//           url: `${API_PREFIX}/order-history?${queryParams.toString()}`,
//           method: 'GET'
//         }
//       },
//       transformResponse: (response: any) => response.data,
//       providesTags: ['Orders']
//     }),
//   })
// })

// export const { 
//   useGetAllOrdersQuery, 
//   useUpdateOrderMutation, 
//   useGetOrderHistoryQuery, 
//   useUpdateOrderReadyMutation 
// } = ordersApi


import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'
import { statsApi } from '../stats/stats.service'
import { bundlesApi } from '../bundle/bundles.service'


const API_PREFIX = 'orders'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Orders', 'Bundles', 'Stats'],
  endpoints: builder => ({
    getAllOrders: builder.query({
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
      providesTags: (result) => [
        'Orders',
        ...(result?.orders || []).map((order: any) => ({
          type: 'Orders' as const,
          id: order._id,
        })),
      ],
    }),

    updateOrder: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `${API_PREFIX}/order-completed/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(ordersApi.util.invalidateTags(['Orders']))
          dispatch(statsApi.util.invalidateTags(['Stats']))
          dispatch(bundlesApi.util.invalidateTags(['Bundles', 'Orders']))
        } catch {}
      },
    }),

    updateOrderReady: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `${API_PREFIX}/order-ready/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(ordersApi.util.invalidateTags(['Orders']))
          dispatch(statsApi.util.invalidateTags(['Stats']))
          dispatch(bundlesApi.util.invalidateTags(['Bundles', 'Orders']))
        } catch {}
      },
    }),

    getOrderHistory: builder.query({
      query: ({ payload }) => {
        const queryParams = new URLSearchParams()
        Object.entries(payload).forEach(([key, value]) => {
          if (typeof value !== 'undefined' && value !== '') {
            queryParams.append(key, String(value))
          }
        })
        return {
          url: `${API_PREFIX}/order-history?${queryParams.toString()}`,
          method: 'GET',
        }
      },
      transformResponse: (response: any) => response.data,
      providesTags: ['Orders'],
    }),

    getOrdersForSecurity: builder.query({
      query: ({ payload }) => {
        const queryParams = new URLSearchParams()
        Object.entries(payload || {}).forEach(([key, value]) => {
          if (typeof value !== "undefined" && value !== "") {
            queryParams.append(key, String(value))
          }
        })
        const url = `${API_PREFIX}/getOrdersForSecurity`;
        const queryString = queryParams.toString();
        return {
          url: queryString ? `${url}?${queryString}` : url,
          method: "GET",
        }
      },
      transformResponse: (response: any) => response,
      providesTags: ["Orders"],
    }),
    
  }),
})

export const {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useGetOrderHistoryQuery,
  useUpdateOrderReadyMutation,
  useGetOrdersForSecurityQuery
} = ordersApi
