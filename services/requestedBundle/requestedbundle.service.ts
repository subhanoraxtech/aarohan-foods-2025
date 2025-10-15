
// import { createApi } from '@reduxjs/toolkit/query/react';
// import { baseQueryWithReauth } from '../base.service';

// const API_PREFIX = 'request';

// export const getrequestApi = createApi({
//   reducerPath: 'getrequestApi',
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ['Request'],
//   endpoints: builder => ({
//     /**
//      * Get all requests
//      */
//     getAllRequests: builder.query({
//       query: ({ payload }) => {
//         const queryParams = new URLSearchParams();

//         Object.entries(payload).forEach(([key, value]) => {
//           if (typeof value !== 'undefined' && value !== '') {
//             queryParams.append(key, String(value));
//           }
//         });

//         return {
//           url: `${API_PREFIX}?${queryParams.toString()}`,
//           method: 'GET',
//         };
//       },
//       transformResponse: (response: any) => {
//         // Normalize response to always return requests as an array
//         const requests = Array.isArray(response.data?.requests)
//           ? response.data.requests
//           : response.data?.requests
//             ? [response.data.requests] // Convert single object to array
//             : [];
//         return {
//           ...response.data,
//           requests,
//         };
//       },
//       providesTags: (result, error, arg) => [
//         'Request',
//         ...(result?.requests || []).map((request: any) => ({
//           type: 'Request' as const,
//           id: request._id,
//         })),
//       ],
//     }),
//   }),
// });

// export const { useGetAllRequestsQuery } = getrequestApi;

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base.service'
import { bundlesApi } from '../bundle/bundles.service'

const API_PREFIX = 'request'

export const getrequestApi = createApi({
  reducerPath: 'getrequestApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Request'],
  endpoints: builder => ({
    getAllRequests: builder.query({
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
      transformResponse: (response: any) => {
        const requests = Array.isArray(response.data?.requests)
          ? response.data.requests
          : response.data?.requests
            ? [response.data.requests]
            : []
        return { ...response.data, requests }
      },
      providesTags: (result) => [
        'Request',
        ...(result?.requests || []).map((request: any) => ({
          type: 'Request' as const,
          id: request._id,
        })),
      ],
    }),

    approveRequest: builder.mutation({
      query: (id) => ({
        url: `${API_PREFIX}/approve/${id}`,
        method: 'PATCH',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // When a request is approved, refetch bundles
          dispatch(bundlesApi.util.invalidateTags(['Bundles']))
          dispatch(getrequestApi.util.invalidateTags(['Request']))
        } catch {}
      },
    }),
  }),
})

export const { useGetAllRequestsQuery, useApproveRequestMutation } = getrequestApi
